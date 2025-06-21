import { useState } from 'react';
import { dbHelpers } from '../lib/supabase';
import { useAuth } from './useAuth';

export const usePayments = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (paymentData: {
    appointment_id?: string;
    amount_rwf: number;
    method: 'mtn_momo' | 'airtel_money' | 'cash' | 'insurance' | 'card';
    phone_number?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const payment = await dbHelpers.createPayment({
        user_id: user.id,
        ...paymentData
      });

      // Here you would integrate with actual payment providers
      // For now, we'll simulate payment processing
      if (paymentData.method === 'mtn_momo' || paymentData.method === 'airtel_money') {
        // Simulate mobile money payment
        setTimeout(async () => {
          try {
            await dbHelpers.updatePaymentStatus(
              payment.id,
              'completed',
              `${paymentData.method.toUpperCase()}_${Date.now()}`
            );
          } catch (err) {
            console.error('Failed to update payment status:', err);
          }
        }, 3000);
      }

      return payment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async (
    paymentId: string,
    method: 'mtn_momo' | 'airtel_money' | 'card',
    phoneNumber?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Here you would integrate with actual payment APIs
      // For demonstration, we'll simulate the process
      
      if (method === 'mtn_momo') {
        // Simulate MTN MoMo API call
        const response = await simulateMoMoPayment(phoneNumber!, paymentId);
        if (response.success) {
          await dbHelpers.updatePaymentStatus(paymentId, 'completed', response.transactionId);
        } else {
          await dbHelpers.updatePaymentStatus(paymentId, 'failed');
          throw new Error(response.message);
        }
      } else if (method === 'airtel_money') {
        // Simulate Airtel Money API call
        const response = await simulateAirtelPayment(phoneNumber!, paymentId);
        if (response.success) {
          await dbHelpers.updatePaymentStatus(paymentId, 'completed', response.transactionId);
        } else {
          await dbHelpers.updatePaymentStatus(paymentId, 'failed');
          throw new Error(response.message);
        }
      }

      return { success: true };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPayment,
    processPayment,
  };
};

// Simulation functions for payment providers
const simulateMoMoPayment = async (phoneNumber: string, paymentId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success/failure (90% success rate)
  const success = Math.random() > 0.1;
  
  return {
    success,
    transactionId: success ? `MTN_${Date.now()}` : null,
    message: success ? 'Payment successful' : 'Insufficient balance or invalid phone number'
  };
};

const simulateAirtelPayment = async (phoneNumber: string, paymentId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success/failure (90% success rate)
  const success = Math.random() > 0.1;
  
  return {
    success,
    transactionId: success ? `AIRTEL_${Date.now()}` : null,
    message: success ? 'Payment successful' : 'Transaction failed'
  };
};