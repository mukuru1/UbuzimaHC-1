import { useState, useEffect } from 'react';
import { dbHelpers } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useDoctors = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDoctors = async (filters?: {
    specialty?: string;
    location?: string;
    available_online?: boolean;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await dbHelpers.getDoctors(filters);
      setDoctors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const getDoctorById = async (id: string) => {
    try {
      return await dbHelpers.getDoctorById(id);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to load doctor');
    }
  };

  const getDoctorReviews = async (doctorId: string) => {
    try {
      return await dbHelpers.getDoctorReviews(doctorId);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to load reviews');
    }
  };

  const createReview = async (reviewData: {
    doctor_id: string;
    appointment_id?: string;
    rating: number;
    comment?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      return await dbHelpers.createReview({
        reviewer_id: user.id,
        ...reviewData
      });
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create review');
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return {
    doctors,
    loading,
    error,
    loadDoctors,
    getDoctorById,
    getDoctorReviews,
    createReview,
  };
};