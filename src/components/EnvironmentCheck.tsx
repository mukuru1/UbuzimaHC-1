import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const EnvironmentCheck: React.FC = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const isConfigured = supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'your_supabase_project_url_here' && 
    supabaseAnonKey !== 'your_supabase_anon_key_here';

  if (isConfigured) {
    return null; // Don't show anything if properly configured
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-200 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
        <div className="text-sm text-yellow-800">
          <strong>Supabase Configuration Required:</strong> Please set up your Supabase environment variables in the .env file to enable authentication and database features.
        </div>
      </div>
    </div>
  );
};

export default EnvironmentCheck;