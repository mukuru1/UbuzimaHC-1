import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
  // Provide fallback values for development
  const fallbackUrl = 'https://placeholder.supabase.co';
  const fallbackKey = 'placeholder-key';
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Helper functions for common database operations
export const dbHelpers = {
  // User operations
  async createUser(userData: {
    id?: string;
    email?: string;
    phone_number: string;
    full_name: string;
    date_of_birth?: string;
    gender?: string;
    role?: 'patient' | 'doctor' | 'admin' | 'clinic_staff';
    district?: string;
    sector?: string;
    cell?: string;
  }) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Doctor operations
  async getDoctors(filters?: {
    specialty?: string;
    location?: string;
    available_online?: boolean;
  }) {
    let query = supabase
      .from('doctors')
      .select(`
        *,
        user:users(*),
        primary_clinic:clinics(*)
      `)
      .eq('is_active', true)
      .eq('is_verified', true);

    if (filters?.specialty) {
      query = query.eq('specialty', filters.specialty);
    }

    if (filters?.available_online !== undefined) {
      query = query.eq('is_available_online', filters.available_online);
    }

    const { data, error } = await query.order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getDoctorById(id: string) {
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        *,
        user:users(*),
        primary_clinic:clinics(*),
        doctor_clinics(
          clinic:clinics(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Clinic operations
  async getClinics(filters?: {
    type?: string;
    district?: string;
  }) {
    let query = supabase
      .from('clinics')
      .select('*')
      .eq('is_active', true);

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.district) {
      query = query.eq('district', filters.district);
    }

    const { data, error } = await query.order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async findNearbyClinics(lat: number, lon: number, radiusKm: number = 50) {
    const { data, error } = await supabase
      .rpc('find_nearby_clinics', {
        user_lat: lat,
        user_lon: lon,
        radius_km: radiusKm
      });
    
    if (error) throw error;
    return data;
  },

  // Appointment operations
  async createAppointment(appointmentData: {
    patient_id: string;
    doctor_id: string;
    clinic_id?: string;
    appointment_date: string;
    appointment_time: string;
    method: 'in_person' | 'video' | 'phone' | 'sms';
    reason_for_visit?: string;
    consultation_fee_rwf: number;
  }) {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserAppointments(userId: string, status?: string) {
    let query = supabase
      .from('appointments')
      .select(`
        *,
        doctor:doctors(
          *,
          user:users(*)
        ),
        clinic:clinics(*),
        payment:payments(*)
      `)
      .eq('patient_id', userId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('appointment_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getDoctorAppointments(doctorId: string, date?: string) {
    let query = supabase
      .from('appointments')
      .select(`
        *,
        patient:users(*),
        clinic:clinics(*),
        payment:payments(*)
      `)
      .eq('doctor_id', doctorId);

    if (date) {
      query = query.eq('appointment_date', date);
    }

    const { data, error } = await query.order('appointment_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Payment operations
  async createPayment(paymentData: {
    user_id: string;
    appointment_id?: string;
    amount_rwf: number;
    method: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card';
    phone_number?: string;
  }) {
    const { data, error } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePaymentStatus(paymentId: string, status: 'completed' | 'failed', transactionId?: string) {
    const updateData: any = { status };
    if (transactionId) updateData.transaction_id = transactionId;
    if (status === 'completed') updateData.paid_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Symptom checker operations
  async createSymptomReport(reportData: {
    user_id: string;
    symptoms: string[];
    probable_conditions?: string[];
    severity_level: 'low' | 'medium' | 'high' | 'emergency';
    recommendation: string;
    should_see_doctor: boolean;
    urgency_score: number;
  }) {
    const { data, error } = await supabase
      .from('symptom_reports')
      .insert(reportData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Review operations
  async createReview(reviewData: {
    reviewer_id: string;
    doctor_id?: string;
    clinic_id?: string;
    appointment_id?: string;
    rating: number;
    comment?: string;
  }) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getDoctorReviews(doctorId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        reviewer:users(full_name)
      `)
      .eq('doctor_id', doctorId)
      .eq('is_verified', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // SMS operations
  async logSMS(smsData: {
    user_id: string;
    phone_number: string;
    message_type: 'appointment_reminder' | 'payment_confirmation' | 'symptom_alert' | 'general';
    content: string;
    appointment_id?: string;
  }) {
    const { data, error } = await supabase
      .from('sms_logs')
      .insert(smsData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};