/*
  # Sample Data for Ubuzima Healthcare Platform

  1. Sample Users (Patients, Doctors, Admins)
  2. Sample Clinics across Rwanda
  3. Sample Doctor Profiles
  4. Sample Appointments
  5. Sample Reviews and Ratings

  Note: This is test data for development purposes
*/

-- Insert sample users (patients)
INSERT INTO users (id, email, phone_number, full_name, date_of_birth, gender, role, district, sector, cell) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'patient1@example.com', '+250788123456', 'Jean Baptiste Uwimana', '1990-05-15', 'male', 'patient', 'Kigali', 'Nyarugenge', 'Rwezamenyo'),
('550e8400-e29b-41d4-a716-446655440002', 'patient2@example.com', '+250788234567', 'Marie Claire Mukamana', '1985-08-22', 'female', 'patient', 'Kigali', 'Gasabo', 'Kimisagara'),
('550e8400-e29b-41d4-a716-446655440003', 'patient3@example.com', '+250788345678', 'Paul Nzeyimana', '1992-12-10', 'male', 'patient', 'Kigali', 'Kicukiro', 'Gatenga'),
('550e8400-e29b-41d4-a716-446655440004', 'patient4@example.com', '+250788456789', 'Grace Uwimana', '1988-03-18', 'female', 'patient', 'Butare', 'Huye', 'Tumba'),
('550e8400-e29b-41d4-a716-446655440005', 'patient5@example.com', '+250788567890', 'David Habimana', '1995-07-25', 'male', 'patient', 'Musanze', 'Musanze', 'Cyuve');

-- Insert sample doctor users
INSERT INTO users (id, email, phone_number, full_name, date_of_birth, gender, role, district) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'dr.uwimana@hospital.rw', '+250788111111', 'Dr. Marie Uwimana', '1980-04-12', 'female', 'doctor', 'Kigali'),
('550e8400-e29b-41d4-a716-446655440011', 'dr.nzeyimana@hospital.rw', '+250788222222', 'Dr. Jean Baptiste Nzeyimana', '1975-09-08', 'male', 'doctor', 'Kigali'),
('550e8400-e29b-41d4-a716-446655440012', 'dr.mukamana@hospital.rw', '+250788333333', 'Dr. Grace Mukamana', '1982-11-30', 'female', 'doctor', 'Kigali'),
('550e8400-e29b-41d4-a716-446655440013', 'dr.habimana@dental.rw', '+250788444444', 'Dr. Paul Habimana', '1978-06-15', 'male', 'doctor', 'Kigali'),
('550e8400-e29b-41d4-a716-446655440014', 'dr.murenzi@hospital.rw', '+250788555555', 'Dr. Alice Murenzi', '1983-01-20', 'female', 'doctor', 'Butare');

-- Insert sample admin user
INSERT INTO users (id, email, phone_number, full_name, role) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'admin@ubuzima.rw', '+250788000000', 'System Administrator', 'admin');

-- Insert sample clinics
INSERT INTO clinics (id, name, type, description, address, district, sector, location, phone_number, email, services, accepted_insurance, license_number, is_verified) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'King Faisal Hospital', 'hospital', 'Leading referral hospital in Rwanda', 'KG 544 St, Kigali', 'Kigali', 'Nyarugenge', ST_GeogFromText('POINT(30.0619 -1.9441)'), '+250788123000', 'info@kfh.rw', ARRAY['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'Cardiology'], ARRAY['RSSB', 'MMI', 'Radiant'], 'RW-HOSP-001', true),
('660e8400-e29b-41d4-a716-446655440002', 'University Teaching Hospital of Kigali', 'hospital', 'Main teaching hospital', 'KK 737 St, Kigali', 'Kigali', 'Gasabo', ST_GeogFromText('POINT(30.1044 -1.9706)'), '+250788234000', 'info@chuk.rw', ARRAY['Emergency', 'Surgery', 'Oncology', 'Neurology'], ARRAY['RSSB', 'MMI'], 'RW-HOSP-002', true),
('660e8400-e29b-41d4-a716-446655440003', 'Rwanda Military Hospital', 'hospital', 'Military and civilian healthcare', 'KN 67 St, Kigali', 'Kigali', 'Kicukiro', ST_GeogFromText('POINT(30.1127 -1.9578)'), '+250788345000', 'info@rmh.rw', ARRAY['Emergency', 'Surgery', 'Rehabilitation'], ARRAY['RSSB', 'Military Insurance'], 'RW-HOSP-003', true),
('660e8400-e29b-41d4-a716-446655440004', 'Butare University Teaching Hospital', 'hospital', 'Southern region referral hospital', 'Butare-Huye', 'Butare', 'Huye', ST_GeogFromText('POINT(29.7394 -2.5967)'), '+250788456000', 'info@chub.rw', ARRAY['Emergency', 'Surgery', 'Maternity', 'Pediatrics'], ARRAY['RSSB', 'MMI'], 'RW-HOSP-004', true),
('660e8400-e29b-41d4-a716-446655440005', 'Dental Care Rwanda', 'clinic', 'Specialized dental clinic', 'KG 15 Ave, Kigali', 'Kigali', 'Nyarugenge', ST_GeogFromText('POINT(30.0588 -1.9512)'), '+250788567000', 'info@dentalcare.rw', ARRAY['General Dentistry', 'Orthodontics', 'Oral Surgery'], ARRAY['RSSB', 'MMI', 'Private'], 'RW-DENT-001', true);

-- Insert sample doctors
INSERT INTO doctors (id, user_id, license_number, specialty, sub_specialties, primary_clinic_id, bio, qualifications, languages, years_of_experience, consultation_fee_rwf, availability, is_available_online, is_verified) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'RW-GP-001234', 'General Practitioner', ARRAY['Preventive Care', 'Family Medicine'], '660e8400-e29b-41d4-a716-446655440001', 'Experienced general practitioner with focus on preventive care and community health.', ARRAY['MD - University of Rwanda', 'Certificate in Public Health'], ARRAY['Kinyarwanda', 'French', 'English'], 8, 15000, '{"Monday": ["09:00", "10:00", "11:00", "14:00", "15:00"], "Tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00"], "Wednesday": ["09:00", "10:00", "11:00"], "Thursday": ["09:00", "10:00", "11:00", "14:00", "15:00"], "Friday": ["09:00", "10:00", "11:00", "14:00"]}', true, true),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440011', 'RW-PED-005678', 'Pediatrician', ARRAY['Infectious Diseases', 'Malnutrition'], '660e8400-e29b-41d4-a716-446655440002', 'Specialized in child healthcare with expertise in infectious diseases and malnutrition.', ARRAY['MD - Pediatrics', 'Fellowship in Infectious Diseases'], ARRAY['Kinyarwanda', 'French', 'English'], 12, 20000, '{"Monday": ["08:00", "09:00", "10:00", "14:00"], "Tuesday": ["08:00", "09:00", "10:00", "14:00"], "Wednesday": ["08:00", "09:00", "10:00"], "Thursday": ["08:00", "09:00", "10:00", "14:00"], "Friday": ["08:00", "09:00", "10:00"]}', true, true),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440012', 'RW-GYN-009012', 'Gynecologist', ARRAY['Maternal Care', 'Reproductive Health'], '660e8400-e29b-41d4-a716-446655440003', 'Women''s health specialist focusing on maternal care and reproductive health.', ARRAY['MD - Obstetrics & Gynecology', 'Advanced Laparoscopy Certificate'], ARRAY['Kinyarwanda', 'English'], 10, 25000, '{"Monday": ["10:00", "11:00", "14:00", "15:00"], "Tuesday": ["10:00", "11:00", "14:00", "15:00"], "Wednesday": ["10:00", "11:00"], "Thursday": ["10:00", "11:00", "14:00", "15:00"], "Friday": ["10:00", "11:00"]}', true, true),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440013', 'RW-DEN-003456', 'Dentist', ARRAY['Cosmetic Dentistry', 'Oral Surgery'], '660e8400-e29b-41d4-a716-446655440005', 'General dentist specializing in preventive care and cosmetic dentistry.', ARRAY['DDS - University of Rwanda', 'Certificate in Cosmetic Dentistry'], ARRAY['Kinyarwanda', 'French', 'English'], 6, 12000, '{"Monday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"], "Tuesday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"], "Wednesday": ["08:00", "09:00", "10:00", "11:00"], "Thursday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"], "Friday": ["08:00", "09:00", "10:00", "11:00"]}', false, true),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440014', 'RW-CARD-007890', 'Cardiologist', ARRAY['Heart Surgery', 'Interventional Cardiology'], '660e8400-e29b-41d4-a716-446655440004', 'Heart specialist with expertise in cardiac interventions and surgery.', ARRAY['MD - Cardiology', 'Fellowship in Interventional Cardiology'], ARRAY['Kinyarwanda', 'French', 'English'], 15, 35000, '{"Monday": ["09:00", "10:00", "14:00"], "Tuesday": ["09:00", "10:00", "14:00"], "Thursday": ["09:00", "10:00", "14:00"], "Friday": ["09:00", "10:00"]}', true, true);

-- Insert sample appointments
INSERT INTO appointments (id, patient_id, doctor_id, clinic_id, appointment_date, appointment_time, method, status, reason_for_visit, consultation_fee_rwf) VALUES
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', CURRENT_DATE + INTERVAL '1 day', '10:00', 'video', 'confirmed', 'General checkup and health screening', 15000),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', CURRENT_DATE + INTERVAL '2 days', '14:00', 'in_person', 'confirmed', 'Child vaccination and growth monitoring', 20000),
('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', CURRENT_DATE + INTERVAL '3 days', '11:00', 'phone', 'confirmed', 'Prenatal consultation', 25000),
('880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005', CURRENT_DATE - INTERVAL '1 week', '09:00', 'in_person', 'completed', 'Dental cleaning and checkup', 12000),
('880e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440004', CURRENT_DATE - INTERVAL '3 days', '14:00', 'in_person', 'completed', 'Heart consultation and ECG', 35000);

-- Insert sample payments
INSERT INTO payments (id, user_id, appointment_id, amount_rwf, method, status, transaction_id, paid_at) VALUES
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 15000, 'mtn_momo', 'completed', 'MTN123456789', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 20000, 'airtel_money', 'completed', 'AIRTEL987654321', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('990e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', 25000, 'mtn_momo', 'pending', NULL, NULL),
('990e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', 12000, 'cash', 'completed', 'CASH001', CURRENT_TIMESTAMP - INTERVAL '1 week'),
('990e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440005', 35000, 'insurance', 'completed', 'INS789123', CURRENT_TIMESTAMP - INTERVAL '3 days');

-- Update appointments with payment IDs
UPDATE appointments SET payment_id = '990e8400-e29b-41d4-a716-446655440001' WHERE id = '880e8400-e29b-41d4-a716-446655440001';
UPDATE appointments SET payment_id = '990e8400-e29b-41d4-a716-446655440002' WHERE id = '880e8400-e29b-41d4-a716-446655440002';
UPDATE appointments SET payment_id = '990e8400-e29b-41d4-a716-446655440003' WHERE id = '880e8400-e29b-41d4-a716-446655440003';
UPDATE appointments SET payment_id = '990e8400-e29b-41d4-a716-446655440004' WHERE id = '880e8400-e29b-41d4-a716-446655440004';
UPDATE appointments SET payment_id = '990e8400-e29b-41d4-a716-446655440005' WHERE id = '880e8400-e29b-41d4-a716-446655440005';

-- Insert sample reviews
INSERT INTO reviews (id, reviewer_id, doctor_id, appointment_id, rating, comment, is_verified) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', 5, 'Excellent service! Dr. Habimana was very professional and gentle during the dental procedure.', true),
('aa0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440005', 4, 'Very knowledgeable cardiologist. Explained everything clearly and provided good treatment.', true),
('aa0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', NULL, 5, 'Dr. Uwimana is amazing! Very caring and thorough in her examinations.', true),
('aa0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', NULL, 5, 'Great pediatrician! My child felt comfortable and the doctor was very patient.', true);

-- Insert sample clinic reviews
INSERT INTO reviews (id, reviewer_id, clinic_id, rating, comment, is_verified) VALUES
('aa0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 5, 'King Faisal Hospital has excellent facilities and professional staff.', true),
('aa0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 4, 'Good hospital with modern equipment. Wait times can be long but worth it.', true);

-- Insert sample symptom reports
INSERT INTO symptom_reports (id, user_id, symptoms, probable_conditions, severity_level, recommendation, should_see_doctor, urgency_score) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', ARRAY['fever', 'headache', 'chills'], ARRAY['Malaria', 'Flu', 'Typhoid'], 'high', 'Seek immediate medical attention for malaria testing', true, 8),
('bb0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', ARRAY['cough', 'runny nose', 'sore throat'], ARRAY['Common Cold', 'Upper Respiratory Infection'], 'low', 'Rest and drink plenty of fluids. Monitor symptoms.', false, 3),
('bb0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', ARRAY['abdominal pain', 'nausea', 'diarrhea'], ARRAY['Gastroenteritis', 'Food Poisoning'], 'medium', 'Stay hydrated and consider seeing a doctor if symptoms persist', true, 5);

-- Insert sample notification preferences
INSERT INTO notification_preferences (user_id, sms_reminders, email_reminders, appointment_confirmations, health_tips) VALUES
('550e8400-e29b-41d4-a716-446655440001', true, true, true, false),
('550e8400-e29b-41d4-a716-446655440002', true, false, true, true),
('550e8400-e29b-41d4-a716-446655440003', true, true, true, false),
('550e8400-e29b-41d4-a716-446655440004', false, true, true, true),
('550e8400-e29b-41d4-a716-446655440005', true, false, true, false);

-- Insert sample SMS logs
INSERT INTO sms_logs (id, user_id, phone_number, message_type, content, status, appointment_id, sent_at) VALUES
('cc0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '+250788123456', 'appointment_reminder', 'Reminder: You have an appointment with Dr. Marie Uwimana tomorrow at 10:00 AM. Please arrive 15 minutes early.', 'delivered', '880e8400-e29b-41d4-a716-446655440001', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('cc0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '+250788234567', 'payment_confirmation', 'Payment of 20,000 RWF confirmed for your appointment with Dr. Jean Baptiste Nzeyimana.', 'delivered', '880e8400-e29b-41d4-a716-446655440002', CURRENT_TIMESTAMP - INTERVAL '2 days');