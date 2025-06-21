import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment } from '../types';

interface AppContextType {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  user: any;
  setUser: (user: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedDoctor,
        setSelectedDoctor,
        appointments,
        setAppointments,
        currentView,
        setCurrentView,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};