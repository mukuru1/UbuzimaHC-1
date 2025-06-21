/*
  # Ubuzima Healthcare Platform Database Schema

  1. Core Tables
    - `users` - All platform users (patients, doctors, admins)
    - `doctors` - Doctor-specific information and credentials
    - `clinics` - Healthcare facilities and centers
    - `appointments` - Scheduled consultations and visits
    - `symptom_reports` - AI symptom checker results
    - `payments` - Payment transactions and records
    - `sms_logs` - SMS and communication tracking
    - `reviews` - Doctor and clinic reviews
    - `medical_records` - Patient health records
    - `prescriptions` - Medication prescriptions

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for data access
    - Ensure GDPR compliance for health data
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin', 'clinic_staff');
CREATE TYPE appointment_method AS ENUM ('in_person', 'video', 'phone', 'sms');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
CREATE TYPE payment_method AS ENUM ('mtn_momo', 'airtel_money', 'cash', 'insurance', 'card');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE severity_level AS ENUM ('low', 'medium', 'high', 'emergency');
CREATE TYPE clinic_type AS ENUM ('hospital', 'health_center', 'clinic', 'pharmacy', 'laboratory');
CREATE TYPE sms_type AS ENUM ('appointment_reminder', 'payment_confirmation', 'symptom_alert', 'general');

-- Users table (core authentication and profile)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  phone_number text UNIQUE NOT NULL,
  full_name text NOT NULL,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  role user_role DEFAULT 'patient',
  language_preference text DEFAULT 'en' CHECK (language_preference IN ('en', 'fr', 'rw')),
  profile_image_url text,
  address text,
  district text,
  sector text,
  cell text,
  emergency_contact_name text,
  emergency_contact_phone text,
  insurance_provider text,
  insurance_number text,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type clinic_type NOT NULL,
  description text,
  address text NOT NULL,
  district text NOT NULL,
  sector text,
  cell text,
  location geography(POINT, 4326),
  phone_number text,
  email text,
  website text,
  operating_hours jsonb DEFAULT '{}',
  services text[] DEFAULT '{}',
  accepted_insurance text[] DEFAULT '{}',
  rating numeric(3,2) DEFAULT 0.0,
  total_reviews integer DEFAULT 0,
  license_number text UNIQUE,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  license_number text UNIQUE NOT NULL,
  specialty text NOT NULL,
  sub_specialties text[] DEFAULT '{}',
  primary_clinic_id uuid REFERENCES clinics(id),
  bio text,
  qualifications text[] DEFAULT '{}',
  languages text[] DEFAULT '{"en"}',
  years_of_experience integer DEFAULT 0,
  consultation_fee_rwf integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0.0,
  total_reviews integer DEFAULT 0,
  availability jsonb DEFAULT '{}',
  is_available_online boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id),
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  method appointment_method DEFAULT 'in_person',
  status appointment_status DEFAULT 'pending',
  reason_for_visit text,
  symptoms text[] DEFAULT '{}',
  notes text,
  consultation_fee_rwf integer DEFAULT 0,
  payment_id uuid,
  reminder_sent_24h boolean DEFAULT false,
  reminder_sent_2h boolean DEFAULT false,
  cancelled_reason text,
  cancelled_by uuid REFERENCES users(id),
  cancelled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Symptom reports table (AI symptom checker)
CREATE TABLE IF NOT EXISTS symptom_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  session_id text,
  symptoms text[] NOT NULL,
  symptom_details jsonb DEFAULT '{}',
  age integer,
  gender text,
  probable_conditions text[] DEFAULT '{}',
  severity_level severity_level DEFAULT 'low',
  recommendation text,
  should_see_doctor boolean DEFAULT false,
  urgency_score integer DEFAULT 0 CHECK (urgency_score >= 0 AND urgency_score <= 10),
  ai_confidence numeric(3,2) DEFAULT 0.0,
  follow_up_needed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id),
  amount_rwf integer NOT NULL,
  method payment_method NOT NULL,
  status payment_status DEFAULT 'pending',
  transaction_id text,
  phone_number text,
  reference_number text,
  provider_response jsonb DEFAULT '{}',
  paid_at timestamptz,
  failed_reason text,
  refunded_at timestamptz,
  refund_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- SMS logs table
CREATE TABLE IF NOT EXISTS sms_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  phone_number text NOT NULL,
  message_type sms_type NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'pending',
  provider_response jsonb DEFAULT '{}',
  appointment_id uuid REFERENCES appointments(id),
  cost_rwf numeric(10,2) DEFAULT 0.0,
  sent_at timestamptz,
  delivered_at timestamptz,
  failed_reason text,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_anonymous boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (doctor_id IS NOT NULL OR clinic_id IS NOT NULL)
);

-- Medical records table
CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id),
  appointment_id uuid REFERENCES appointments(id),
  record_type text NOT NULL,
  title text NOT NULL,
  description text,
  diagnosis text,
  treatment_plan text,
  vital_signs jsonb DEFAULT '{}',
  lab_results jsonb DEFAULT '{}',
  attachments text[] DEFAULT '{}',
  is_confidential boolean DEFAULT false,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  appointment_id uuid REFERENCES appointments(id),
  medical_record_id uuid REFERENCES medical_records(id),
  medications jsonb NOT NULL DEFAULT '[]',
  instructions text,
  duration_days integer,
  refills_allowed integer DEFAULT 0,
  refills_used integer DEFAULT 0,
  is_active boolean DEFAULT true,
  dispensed_at timestamptz,
  dispensed_by text,
  pharmacy_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Doctor clinic associations (many-to-many)
CREATE TABLE IF NOT EXISTS doctor_clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE,
  is_primary boolean DEFAULT false,
  schedule jsonb DEFAULT '{}',
  consultation_fee_rwf integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(doctor_id, clinic_id)
);

-- Notification preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  sms_reminders boolean DEFAULT true,
  email_reminders boolean DEFAULT true,
  appointment_confirmations boolean DEFAULT true,
  health_tips boolean DEFAULT false,
  promotional_messages boolean DEFAULT false,
  emergency_alerts boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_clinic ON doctors(primary_clinic_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_clinics_location ON clinics USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_symptom_reports_user ON symptom_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_doctor ON reviews(doctor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_clinic ON reviews(clinic_id);

-- Add foreign key for payments to appointments
ALTER TABLE appointments ADD CONSTRAINT fk_appointments_payment 
  FOREIGN KEY (payment_id) REFERENCES payments(id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;