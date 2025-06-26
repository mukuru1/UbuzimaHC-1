import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, dbHelpers } from '../lib/supabase';

interface UserProfile {
  id: string;
  full_name: string;
  phone_number: string;
  role: string;
  district?: string;
  sector?: string;
  cell?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  insurance_provider?: string;
  insurance_number?: string;
  profile_image_url?: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  address?: string;
  language_preference?: string;
  is_active?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

interface AuthUser extends User {
  profile?: UserProfile;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      const profile = await dbHelpers.getUserById(authUser.id);
      setUser({
        ...authUser,
        profile: profile
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(authUser as AuthUser);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: {
    full_name: string;
    phone_number: string;
    date_of_birth?: string;
    gender?: string;
    district?: string;
    sector?: string;
    cell?: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;

      // Create user profile in our users table
      if (data.user) {
        await dbHelpers.createUser({
          id: data.user.id,
          email,
          ...userData
        });
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: {
    full_name?: string;
    phone_number?: string;
    district?: string;
    sector?: string;
    cell?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    insurance_provider?: string;
    insurance_number?: string;
  }) => {
    if (!user) throw new Error('No user logged in');

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update local user state
      setUser({
        ...user,
        profile: { ...user.profile, ...data }
      });

      return data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };
};