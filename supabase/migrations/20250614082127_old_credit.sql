/*
  # Database Functions for Ubuzima Healthcare Platform

  1. Utility Functions
    - Update ratings for doctors and clinics
    - Calculate distances between locations
    - Generate appointment slots

  2. Business Logic Functions
    - Book appointment with payment
    - Send SMS notifications
    - Update availability

  3. Analytics Functions
    - Get popular doctors
    - Calculate clinic statistics
*/

-- Function to update doctor ratings
CREATE OR REPLACE FUNCTION update_doctor_rating(doctor_uuid uuid)
RETURNS void AS $$
BEGIN
  UPDATE doctors
  SET 
    rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews
      WHERE doctor_id = doctor_uuid
    ), 0.0),
    total_reviews = COALESCE((
      SELECT COUNT(*)
      FROM reviews
      WHERE doctor_id = doctor_uuid
    ), 0)
  WHERE id = doctor_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update clinic ratings
CREATE OR REPLACE FUNCTION update_clinic_rating(clinic_uuid uuid)
RETURNS void AS $$
BEGIN
  UPDATE clinics
  SET 
    rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews
      WHERE clinic_id = clinic_uuid
    ), 0.0),
    total_reviews = COALESCE((
      SELECT COUNT(*)
      FROM reviews
      WHERE clinic_id = clinic_uuid
    ), 0)
  WHERE id = clinic_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 double precision,
  lon1 double precision,
  lat2 double precision,
  lon2 double precision
)
RETURNS double precision AS $$
BEGIN
  RETURN ST_Distance(
    ST_GeogFromText('POINT(' || lon1 || ' ' || lat1 || ')'),
    ST_GeogFromText('POINT(' || lon2 || ' ' || lat2 || ')')
  ) / 1000; -- Return distance in kilometers
END;
$$ LANGUAGE plpgsql;

-- Function to find nearby clinics
CREATE OR REPLACE FUNCTION find_nearby_clinics(
  user_lat double precision,
  user_lon double precision,
  radius_km double precision DEFAULT 50
)
RETURNS TABLE(
  clinic_id uuid,
  clinic_name text,
  clinic_type clinic_type,
  address text,
  distance_km double precision,
  rating numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.name,
    c.type,
    c.address,
    ST_Distance(
      c.location,
      ST_GeogFromText('POINT(' || user_lon || ' ' || user_lat || ')')
    ) / 1000 AS distance_km,
    c.rating
  FROM clinics c
  WHERE 
    c.is_active = true
    AND ST_DWithin(
      c.location,
      ST_GeogFromText('POINT(' || user_lon || ' ' || user_lat || ')'),
      radius_km * 1000
    )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Function to get available appointment slots
CREATE OR REPLACE FUNCTION get_available_slots(
  doctor_uuid uuid,
  appointment_date date,
  slot_duration_minutes integer DEFAULT 30
)
RETURNS TABLE(
  time_slot time,
  is_available boolean
) AS $$
DECLARE
  doc_availability jsonb;
  day_name text;
  start_time time;
  end_time time;
  current_slot time;
BEGIN
  -- Get day name
  day_name := to_char(appointment_date, 'Day');
  day_name := trim(day_name);
  
  -- Get doctor's availability for this day
  SELECT availability INTO doc_availability
  FROM doctors
  WHERE id = doctor_uuid;
  
  -- If no availability data, return empty
  IF doc_availability IS NULL OR NOT doc_availability ? day_name THEN
    RETURN;
  END IF;
  
  -- Generate time slots (simplified - assumes 9 AM to 5 PM)
  current_slot := '09:00:00'::time;
  WHILE current_slot <= '17:00:00'::time LOOP
    RETURN QUERY
    SELECT 
      current_slot,
      NOT EXISTS (
        SELECT 1 FROM appointments
        WHERE doctor_id = doctor_uuid
        AND appointment_date = get_available_slots.appointment_date
        AND appointment_time = current_slot
        AND status IN ('pending', 'confirmed')
      );
    
    current_slot := current_slot + (slot_duration_minutes || ' minutes')::interval;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to book appointment with payment
CREATE OR REPLACE FUNCTION book_appointment_with_payment(
  patient_uuid uuid,
  doctor_uuid uuid,
  clinic_uuid uuid,
  appointment_date date,
  appointment_time time,
  method appointment_method,
  consultation_fee integer,
  payment_method payment_method,
  phone_number text DEFAULT NULL
)
RETURNS TABLE(
  appointment_id uuid,
  payment_id uuid,
  success boolean,
  message text
) AS $$
DECLARE
  new_appointment_id uuid;
  new_payment_id uuid;
  slot_available boolean;
BEGIN
  -- Check if slot is available
  SELECT NOT EXISTS (
    SELECT 1 FROM appointments
    WHERE doctor_id = doctor_uuid
    AND appointment_date = book_appointment_with_payment.appointment_date
    AND appointment_time = book_appointment_with_payment.appointment_time
    AND status IN ('pending', 'confirmed')
  ) INTO slot_available;
  
  IF NOT slot_available THEN
    RETURN QUERY SELECT NULL::uuid, NULL::uuid, false, 'Time slot not available';
    RETURN;
  END IF;
  
  -- Create payment record
  INSERT INTO payments (user_id, amount_rwf, method, phone_number)
  VALUES (patient_uuid, consultation_fee, payment_method, phone_number)
  RETURNING id INTO new_payment_id;
  
  -- Create appointment
  INSERT INTO appointments (
    patient_id, doctor_id, clinic_id, appointment_date, 
    appointment_time, method, consultation_fee_rwf, payment_id
  )
  VALUES (
    patient_uuid, doctor_uuid, clinic_uuid, appointment_date,
    appointment_time, method, consultation_fee, new_payment_id
  )
  RETURNING id INTO new_appointment_id;
  
  RETURN QUERY SELECT 
    new_appointment_id, 
    new_payment_id, 
    true, 
    'Appointment booked successfully';
END;
$$ LANGUAGE plpgsql;

-- Function to get doctor statistics
CREATE OR REPLACE FUNCTION get_doctor_stats(doctor_uuid uuid)
RETURNS TABLE(
  total_appointments integer,
  completed_appointments integer,
  average_rating numeric,
  total_reviews integer,
  completion_rate numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::integer as total_appointments,
    COUNT(CASE WHEN status = 'completed' THEN 1 END)::integer as completed_appointments,
    COALESCE(AVG(r.rating), 0)::numeric as average_rating,
    COUNT(r.id)::integer as total_reviews,
    CASE 
      WHEN COUNT(*) > 0 THEN 
        ROUND((COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / COUNT(*)::numeric) * 100, 2)
      ELSE 0
    END as completion_rate
  FROM appointments a
  LEFT JOIN reviews r ON r.doctor_id = doctor_uuid
  WHERE a.doctor_id = doctor_uuid;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings after review insert/update
CREATE OR REPLACE FUNCTION trigger_update_ratings()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    IF NEW.doctor_id IS NOT NULL THEN
      PERFORM update_doctor_rating(NEW.doctor_id);
    END IF;
    IF NEW.clinic_id IS NOT NULL THEN
      PERFORM update_clinic_rating(NEW.clinic_id);
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.doctor_id IS NOT NULL THEN
      PERFORM update_doctor_rating(OLD.doctor_id);
    END IF;
    IF OLD.clinic_id IS NOT NULL THEN
      PERFORM update_clinic_rating(OLD.clinic_id);
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS update_ratings_trigger ON reviews;
CREATE TRIGGER update_ratings_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION trigger_update_ratings();

-- Function to send appointment reminders (placeholder for SMS integration)
CREATE OR REPLACE FUNCTION send_appointment_reminders()
RETURNS integer AS $$
DECLARE
  reminder_count integer := 0;
  appointment_record record;
BEGIN
  -- Send 24-hour reminders
  FOR appointment_record IN
    SELECT a.id, a.patient_id, u.phone_number, u.full_name, d.user_id as doctor_user_id, du.full_name as doctor_name
    FROM appointments a
    JOIN users u ON a.patient_id = u.id
    JOIN doctors d ON a.doctor_id = d.id
    JOIN users du ON d.user_id = du.id
    WHERE a.appointment_date = CURRENT_DATE + INTERVAL '1 day'
    AND a.status = 'confirmed'
    AND a.reminder_sent_24h = false
  LOOP
    -- Insert SMS log (actual SMS sending would be handled by external service)
    INSERT INTO sms_logs (user_id, phone_number, message_type, content, appointment_id)
    VALUES (
      appointment_record.patient_id,
      appointment_record.phone_number,
      'appointment_reminder',
      'Reminder: You have an appointment with ' || appointment_record.doctor_name || ' tomorrow. Please arrive 15 minutes early.',
      appointment_record.id
    );
    
    -- Mark reminder as sent
    UPDATE appointments 
    SET reminder_sent_24h = true 
    WHERE id = appointment_record.id;
    
    reminder_count := reminder_count + 1;
  END LOOP;
  
  RETURN reminder_count;
END;
$$ LANGUAGE plpgsql;