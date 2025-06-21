/*
  # Row Level Security Policies for Ubuzima Healthcare Platform

  1. User Policies
    - Users can read/update their own profile
    - Doctors can read patient profiles for their appointments
    - Admins can manage all users

  2. Doctor Policies
    - Public read access for doctor profiles
    - Doctors can update their own profiles
    - Admins can manage all doctors

  3. Appointment Policies
    - Patients can manage their own appointments
    - Doctors can manage appointments assigned to them
    - Clinic staff can view appointments at their clinic

  4. Medical Records Policies
    - Strict access control for sensitive health data
    - Patients own their records
    - Doctors can access records for their patients

  5. Payment Policies
    - Users can view their own payment history
    - Financial data is highly protected
*/

-- Users table policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Doctors can read patient profiles for appointments"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    role = 'patient' AND
    EXISTS (
      SELECT 1 FROM doctors d
      JOIN appointments a ON d.id = a.doctor_id
      WHERE d.user_id = auth.uid() AND a.patient_id = users.id
    )
  );

CREATE POLICY "Admins can manage all users"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Doctors table policies
CREATE POLICY "Public read access for doctor profiles"
  ON doctors
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Doctors can update own profile"
  ON doctors
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage doctors"
  ON doctors
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clinics table policies
CREATE POLICY "Public read access for clinics"
  ON clinics
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Clinic staff can update their clinic"
  ON clinics
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'clinic_staff'
    )
  );

CREATE POLICY "Admins can manage clinics"
  ON clinics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Appointments table policies
CREATE POLICY "Patients can manage own appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can manage their appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM doctors
      WHERE user_id = auth.uid() AND id = appointments.doctor_id
    )
  );

CREATE POLICY "Clinic staff can view clinic appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'clinic_staff'
    )
  );

-- Symptom reports table policies
CREATE POLICY "Users can manage own symptom reports"
  ON symptom_reports
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Doctors can read symptom reports for their patients"
  ON symptom_reports
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM doctors d
      JOIN appointments a ON d.id = a.doctor_id
      WHERE d.user_id = auth.uid() AND a.patient_id = symptom_reports.user_id
    )
  );

-- Payments table policies
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- SMS logs table policies
CREATE POLICY "Users can view own SMS logs"
  ON sms_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create SMS logs"
  ON sms_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Reviews table policies
CREATE POLICY "Users can read all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for their appointments"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    reviewer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM appointments
      WHERE id = reviews.appointment_id AND patient_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (reviewer_id = auth.uid());

-- Medical records table policies
CREATE POLICY "Patients can read own medical records"
  ON medical_records
  FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can read records for their patients"
  ON medical_records
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM doctors d
      JOIN appointments a ON d.id = a.doctor_id
      WHERE d.user_id = auth.uid() AND a.patient_id = medical_records.patient_id
    )
  );

CREATE POLICY "Doctors can create medical records"
  ON medical_records
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM doctors
      WHERE user_id = auth.uid() AND id = medical_records.doctor_id
    )
  );

-- Prescriptions table policies
CREATE POLICY "Patients can read own prescriptions"
  ON prescriptions
  FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can manage prescriptions for their patients"
  ON prescriptions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM doctors
      WHERE user_id = auth.uid() AND id = prescriptions.doctor_id
    )
  );

-- Doctor clinics table policies
CREATE POLICY "Public read access for doctor-clinic associations"
  ON doctor_clinics
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Doctors can manage own clinic associations"
  ON doctor_clinics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM doctors
      WHERE user_id = auth.uid() AND id = doctor_clinics.doctor_id
    )
  );

-- Notification preferences table policies
CREATE POLICY "Users can manage own notification preferences"
  ON notification_preferences
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());