import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, MessageSquare, Star, MoreVertical } from 'lucide-react';
import { mockDoctors } from '../data/mockData';
import { Appointment } from '../types';

const MyAppointments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      doctorId: '1',
      doctorName: 'Dr. Marie Uwimana',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'video',
      status: 'scheduled',
      fee: 15000
    },
    {
      id: '2',
      doctorId: '2',
      doctorName: 'Dr. Jean Baptiste Nzeyimana',
      date: '2024-01-18',
      time: '2:30 PM',
      type: 'in-person',
      status: 'scheduled',
      fee: 20000
    },
    {
      id: '3',
      doctorId: '3',
      doctorName: 'Dr. Grace Mukamana',
      date: '2024-01-08',
      time: '11:00 AM',
      type: 'phone',
      status: 'completed',
      fee: 25000
    }
  ];

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = mockAppointments.filter(apt => apt.status === 'completed');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-sky-500';
      case 'phone': return 'bg-emerald-500';
      default: return 'bg-purple-500';
    }
  };

  const AppointmentCard = ({ appointment, isPast = false }: { appointment: Appointment; isPast?: boolean }) => {
    const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <img
              src={doctor?.profileImage}
              alt={appointment.doctorName}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{appointment.doctorName}</h3>
              <p className="text-sky-600 font-medium">{doctor?.specialty}</p>
              <p className="text-gray-600 text-sm">{doctor?.hospital}</p>
            </div>
          </div>
          
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{appointment.time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`${getTypeColor(appointment.type)} p-2 rounded-lg mr-3`}>
              {getTypeIcon(appointment.type)}
              <span className="sr-only">{appointment.type}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 capitalize">
                {appointment.type === 'in-person' ? 'In-Person Visit' : `${appointment.type} Call`}
              </p>
              <p className="text-sm text-gray-600">{appointment.fee.toLocaleString()} RWF</p>
            </div>
          </div>
          
          {appointment.status === 'scheduled' && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
              Confirmed
            </span>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          {isPast ? (
            <div className="flex space-x-3">
              <button className="flex-1 flex items-center justify-center py-2 text-sky-600 border border-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Doctor
              </button>
              <button className="flex-1 flex items-center justify-center py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                Rate Visit
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Reschedule
              </button>
              <button className="flex-1 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                Join Consultation
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 max-w-xs">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'past'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === 'upcoming' ? (
            upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
                <p className="text-gray-600 mb-6">Schedule your next consultation with a healthcare professional</p>
                <button className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors">
                  Find a Doctor
                </button>
              </div>
            )
          ) : (
            pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} isPast={true} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No past appointments</h3>
                <p className="text-gray-600">Your completed appointments will appear here</p>
              </div>
            )
          )}
        </div>

        {/* Quick Actions */}
        {activeTab === 'upcoming' && upcomingAppointments.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                <span>Reschedule Appointment</span>
              </button>
              <button className="flex items-center justify-center py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <MessageSquare className="h-5 w-5 mr-2 text-gray-600" />
                <span>Message Doctor</span>
              </button>
              <button className="flex items-center justify-center py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Phone className="h-5 w-5 mr-2 text-gray-600" />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;