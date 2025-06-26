import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Home from './components/Home';
import DoctorSearch from './components/DoctorSearch';
import DoctorProfile from './components/DoctorProfile';
import SymptomChecker from './components/SymptomChecker';
import Telehealth from './components/Telehealth';
import AppointmentBooking from './components/AppointmentBooking';
import MyAppointments from './components/MyAppointments';
import UserProfile from './components/profile/UserProfile';
import Settings from './components/settings/Settings';
import MedicalRecords from './components/medical-records/MedicalRecords';
import PatientDashboard from './components/dashboard/PatientDashboard';
import EnvironmentCheck from './components/EnvironmentCheck';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'doctors':
        return <DoctorSearch />;
      case 'doctor-profile':
        return <DoctorProfile />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'telehealth':
        return <Telehealth />;
      case 'booking':
        return <AppointmentBooking />;
      case 'appointments':
        return <MyAppointments />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <Settings />;
      case 'medical-records':
        return <MedicalRecords />;
      case 'dashboard':
        return <PatientDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EnvironmentCheck />
      <Header />
      {renderCurrentView()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;