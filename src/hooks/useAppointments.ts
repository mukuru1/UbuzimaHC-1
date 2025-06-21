import { useState, useEffect } from 'react';
import { supabase, dbHelpers } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = async (status?: string) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await dbHelpers.getUserAppointments(user.id, status);
      setAppointments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (appointmentData: {
    doctor_id: string;
    clinic_id?: string;
    appointment_date: string;
    appointment_time: string;
    method: 'in_person' | 'video' | 'phone' | 'sms';
    reason_for_visit?: string;
    consultation_fee_rwf: number;
  }) => {
    if (!user) throw new Error('User not authenticated');

    const appointment = await dbHelpers.createAppointment({
      patient_id: user.id,
      ...appointmentData
    });

    // Reload appointments
    await loadAppointments();

    return appointment;
  };

  const cancelAppointment = async (appointmentId: string, reason?: string) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('appointments')
      .update({
        status: 'cancelled',
        cancelled_reason: reason,
        cancelled_by: user.id,
        cancelled_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw error;

    // Reload appointments
    await loadAppointments();

    return data;
  };

  const rescheduleAppointment = async (
    appointmentId: string,
    newDate: string,
    newTime: string
  ) => {
    const { data, error } = await supabase
      .from('appointments')
      .update({
        appointment_date: newDate,
        appointment_time: newTime,
        status: 'pending' // Reset to pending for confirmation
      })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw error;

    // Reload appointments
    await loadAppointments();

    return data;
  };

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  return {
    appointments,
    loading,
    error,
    loadAppointments,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
  };
};