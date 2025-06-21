export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          phone_number: string
          full_name: string
          date_of_birth: string | null
          gender: string | null
          role: 'patient' | 'doctor' | 'admin' | 'clinic_staff'
          language_preference: string
          profile_image_url: string | null
          address: string | null
          district: string | null
          sector: string | null
          cell: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          insurance_provider: string | null
          insurance_number: string | null
          is_active: boolean
          email_verified: boolean
          phone_verified: boolean
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          email?: string | null
          phone_number: string
          full_name: string
          date_of_birth?: string | null
          gender?: string | null
          role?: 'patient' | 'doctor' | 'admin' | 'clinic_staff'
          language_preference?: string
          profile_image_url?: string | null
          address?: string | null
          district?: string | null
          sector?: string | null
          cell?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          insurance_provider?: string | null
          insurance_number?: string | null
          is_active?: boolean
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          phone_number?: string
          full_name?: string
          date_of_birth?: string | null
          gender?: string | null
          role?: 'patient' | 'doctor' | 'admin' | 'clinic_staff'
          language_preference?: string
          profile_image_url?: string | null
          address?: string | null
          district?: string | null
          sector?: string | null
          cell?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          insurance_provider?: string | null
          insurance_number?: string | null
          is_active?: boolean
          email_verified?: boolean
          phone_verified?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      doctors: {
        Row: {
          id: string
          user_id: string | null
          license_number: string
          specialty: string
          sub_specialties: string[]
          primary_clinic_id: string | null
          bio: string | null
          qualifications: string[]
          languages: string[]
          years_of_experience: number
          consultation_fee_rwf: number
          rating: number
          total_reviews: number
          availability: Json
          is_available_online: boolean
          is_verified: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          license_number: string
          specialty: string
          sub_specialties?: string[]
          primary_clinic_id?: string | null
          bio?: string | null
          qualifications?: string[]
          languages?: string[]
          years_of_experience?: number
          consultation_fee_rwf?: number
          rating?: number
          total_reviews?: number
          availability?: Json
          is_available_online?: boolean
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          license_number?: string
          specialty?: string
          sub_specialties?: string[]
          primary_clinic_id?: string | null
          bio?: string | null
          qualifications?: string[]
          languages?: string[]
          years_of_experience?: number
          consultation_fee_rwf?: number
          rating?: number
          total_reviews?: number
          availability?: Json
          is_available_online?: boolean
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clinics: {
        Row: {
          id: string
          name: string
          type: 'hospital' | 'health_center' | 'clinic' | 'pharmacy' | 'laboratory'
          description: string | null
          address: string
          district: string
          sector: string | null
          cell: string | null
          location: unknown | null
          phone_number: string | null
          email: string | null
          website: string | null
          operating_hours: Json
          services: string[]
          accepted_insurance: string[]
          rating: number
          total_reviews: number
          license_number: string | null
          is_verified: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'hospital' | 'health_center' | 'clinic' | 'pharmacy' | 'laboratory'
          description?: string | null
          address: string
          district: string
          sector?: string | null
          cell?: string | null
          location?: unknown | null
          phone_number?: string | null
          email?: string | null
          website?: string | null
          operating_hours?: Json
          services?: string[]
          accepted_insurance?: string[]
          rating?: number
          total_reviews?: number
          license_number?: string | null
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'hospital' | 'health_center' | 'clinic' | 'pharmacy' | 'laboratory'
          description?: string | null
          address?: string
          district?: string
          sector?: string | null
          cell?: string | null
          location?: unknown | null
          phone_number?: string | null
          email?: string | null
          website?: string | null
          operating_hours?: Json
          services?: string[]
          accepted_insurance?: string[]
          rating?: number
          total_reviews?: number
          license_number?: string | null
          is_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string | null
          doctor_id: string | null
          clinic_id: string | null
          appointment_date: string
          appointment_time: string
          method: 'in_person' | 'video' | 'phone' | 'sms'
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
          reason_for_visit: string | null
          symptoms: string[]
          notes: string | null
          consultation_fee_rwf: number
          payment_id: string | null
          reminder_sent_24h: boolean
          reminder_sent_2h: boolean
          cancelled_reason: string | null
          cancelled_by: string | null
          cancelled_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          clinic_id?: string | null
          appointment_date: string
          appointment_time: string
          method?: 'in_person' | 'video' | 'phone' | 'sms'
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
          reason_for_visit?: string | null
          symptoms?: string[]
          notes?: string | null
          consultation_fee_rwf?: number
          payment_id?: string | null
          reminder_sent_24h?: boolean
          reminder_sent_2h?: boolean
          cancelled_reason?: string | null
          cancelled_by?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          clinic_id?: string | null
          appointment_date?: string
          appointment_time?: string
          method?: 'in_person' | 'video' | 'phone' | 'sms'
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
          reason_for_visit?: string | null
          symptoms?: string[]
          notes?: string | null
          consultation_fee_rwf?: number
          payment_id?: string | null
          reminder_sent_24h?: boolean
          reminder_sent_2h?: boolean
          cancelled_reason?: string | null
          cancelled_by?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      symptom_reports: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          symptoms: string[]
          symptom_details: Json
          age: number | null
          gender: string | null
          probable_conditions: string[]
          severity_level: 'low' | 'medium' | 'high' | 'emergency'
          recommendation: string | null
          should_see_doctor: boolean
          urgency_score: number
          ai_confidence: number
          follow_up_needed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          symptoms: string[]
          symptom_details?: Json
          age?: number | null
          gender?: string | null
          probable_conditions?: string[]
          severity_level?: 'low' | 'medium' | 'high' | 'emergency'
          recommendation?: string | null
          should_see_doctor?: boolean
          urgency_score?: number
          ai_confidence?: number
          follow_up_needed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          symptoms?: string[]
          symptom_details?: Json
          age?: number | null
          gender?: string | null
          probable_conditions?: string[]
          severity_level?: 'low' | 'medium' | 'high' | 'emergency'
          recommendation?: string | null
          should_see_doctor?: boolean
          urgency_score?: number
          ai_confidence?: number
          follow_up_needed?: boolean
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string | null
          appointment_id: string | null
          amount_rwf: number
          method: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card'
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id: string | null
          phone_number: string | null
          reference_number: string | null
          provider_response: Json
          paid_at: string | null
          failed_reason: string | null
          refunded_at: string | null
          refund_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          appointment_id?: string | null
          amount_rwf: number
          method: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card'
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id?: string | null
          phone_number?: string | null
          reference_number?: string | null
          provider_response?: Json
          paid_at?: string | null
          failed_reason?: string | null
          refunded_at?: string | null
          refund_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          appointment_id?: string | null
          amount_rwf?: number
          method?: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card'
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          transaction_id?: string | null
          phone_number?: string | null
          reference_number?: string | null
          provider_response?: Json
          paid_at?: string | null
          failed_reason?: string | null
          refunded_at?: string | null
          refund_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sms_logs: {
        Row: {
          id: string
          user_id: string | null
          phone_number: string
          message_type: 'appointment_reminder' | 'payment_confirmation' | 'symptom_alert' | 'general'
          content: string
          status: string
          provider_response: Json
          appointment_id: string | null
          cost_rwf: number
          sent_at: string | null
          delivered_at: string | null
          failed_reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          phone_number: string
          message_type: 'appointment_reminder' | 'payment_confirmation' | 'symptom_alert' | 'general'
          content: string
          status?: string
          provider_response?: Json
          appointment_id?: string | null
          cost_rwf?: number
          sent_at?: string | null
          delivered_at?: string | null
          failed_reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          phone_number?: string
          message_type?: 'appointment_reminder' | 'payment_confirmation' | 'symptom_alert' | 'general'
          content?: string
          status?: string
          provider_response?: Json
          appointment_id?: string | null
          cost_rwf?: number
          sent_at?: string | null
          delivered_at?: string | null
          failed_reason?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          reviewer_id: string | null
          doctor_id: string | null
          clinic_id: string | null
          appointment_id: string | null
          rating: number
          comment: string | null
          is_anonymous: boolean
          is_verified: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reviewer_id?: string | null
          doctor_id?: string | null
          clinic_id?: string | null
          appointment_id?: string | null
          rating: number
          comment?: string | null
          is_anonymous?: boolean
          is_verified?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reviewer_id?: string | null
          doctor_id?: string | null
          clinic_id?: string | null
          appointment_id?: string | null
          rating?: number
          comment?: string | null
          is_anonymous?: boolean
          is_verified?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string | null
          doctor_id: string | null
          appointment_id: string | null
          record_type: string
          title: string
          description: string | null
          diagnosis: string | null
          treatment_plan: string | null
          vital_signs: Json
          lab_results: Json
          attachments: string[]
          is_confidential: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          appointment_id?: string | null
          record_type: string
          title: string
          description?: string | null
          diagnosis?: string | null
          treatment_plan?: string | null
          vital_signs?: Json
          lab_results?: Json
          attachments?: string[]
          is_confidential?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          appointment_id?: string | null
          record_type?: string
          title?: string
          description?: string | null
          diagnosis?: string | null
          treatment_plan?: string | null
          vital_signs?: Json
          lab_results?: Json
          attachments?: string[]
          is_confidential?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      prescriptions: {
        Row: {
          id: string
          patient_id: string | null
          doctor_id: string | null
          appointment_id: string | null
          medical_record_id: string | null
          medications: Json
          instructions: string | null
          duration_days: number | null
          refills_allowed: number
          refills_used: number
          is_active: boolean
          dispensed_at: string | null
          dispensed_by: string | null
          pharmacy_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          appointment_id?: string | null
          medical_record_id?: string | null
          medications?: Json
          instructions?: string | null
          duration_days?: number | null
          refills_allowed?: number
          refills_used?: number
          is_active?: boolean
          dispensed_at?: string | null
          dispensed_by?: string | null
          pharmacy_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string | null
          doctor_id?: string | null
          appointment_id?: string | null
          medical_record_id?: string | null
          medications?: Json
          instructions?: string | null
          duration_days?: number | null
          refills_allowed?: number
          refills_used?: number
          is_active?: boolean
          dispensed_at?: string | null
          dispensed_by?: string | null
          pharmacy_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      doctor_clinics: {
        Row: {
          id: string
          doctor_id: string | null
          clinic_id: string | null
          is_primary: boolean
          schedule: Json
          consultation_fee_rwf: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id?: string | null
          clinic_id?: string | null
          is_primary?: boolean
          schedule?: Json
          consultation_fee_rwf?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string | null
          clinic_id?: string | null
          is_primary?: boolean
          schedule?: Json
          consultation_fee_rwf?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      notification_preferences: {
        Row: {
          id: string
          user_id: string | null
          sms_reminders: boolean
          email_reminders: boolean
          appointment_confirmations: boolean
          health_tips: boolean
          promotional_messages: boolean
          emergency_alerts: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          sms_reminders?: boolean
          email_reminders?: boolean
          appointment_confirmations?: boolean
          health_tips?: boolean
          promotional_messages?: boolean
          emergency_alerts?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          sms_reminders?: boolean
          email_reminders?: boolean
          appointment_confirmations?: boolean
          health_tips?: boolean
          promotional_messages?: boolean
          emergency_alerts?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_nearby_clinics: {
        Args: {
          user_lat: number
          user_lon: number
          radius_km?: number
        }
        Returns: {
          clinic_id: string
          clinic_name: string
          clinic_type: 'hospital' | 'health_center' | 'clinic' | 'pharmacy' | 'laboratory'
          address: string
          distance_km: number
          rating: number
        }[]
      }
      get_available_slots: {
        Args: {
          doctor_uuid: string
          appointment_date: string
          slot_duration_minutes?: number
        }
        Returns: {
          time_slot: string
          is_available: boolean
        }[]
      }
      book_appointment_with_payment: {
        Args: {
          patient_uuid: string
          doctor_uuid: string
          clinic_uuid: string
          appointment_date: string
          appointment_time: string
          method: 'in_person' | 'video' | 'phone' | 'sms'
          consultation_fee: number
          payment_method: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card'
          phone_number?: string
        }
        Returns: {
          appointment_id: string
          payment_id: string
          success: boolean
          message: string
        }[]
      }
      get_doctor_stats: {
        Args: {
          doctor_uuid: string
        }
        Returns: {
          total_appointments: number
          completed_appointments: number
          average_rating: number
          total_reviews: number
          completion_rate: number
        }[]
      }
      send_appointment_reminders: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      appointment_method: 'in_person' | 'video' | 'phone' | 'sms'
      appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
      clinic_type: 'hospital' | 'health_center' | 'clinic' | 'pharmacy' | 'laboratory'
      payment_method: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      severity_level: 'low' | 'medium' | 'high' | 'emergency'
      sms_type: 'appointment_reminder' | 'payment_confirmation' | 'symptom_alert' | 'general'
      user_role: 'patient' | 'doctor' | 'admin' | 'clinic_staff'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}