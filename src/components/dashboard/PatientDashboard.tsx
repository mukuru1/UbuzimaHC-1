import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Video, MessageSquare, Star, Bell, User, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, loading } = useAppointments();
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = appointments.filter(apt => apt.status === 'confirmed' || apt.status === 'pending');
  const recentAppointments = appointments.filter(apt => apt.status === 'completed').slice(0, 3);

  const stats = [
    { label: 'Total Appointments', value: appointments.length, color: 'bg-blue-500' },
    { label: 'Upcoming', value: upcomingAppointments.length, color: 'bg-emerald-500' },
    { label: 'Completed', value: appointments.filter(apt => apt.status === 'completed').length, color: 'bg-purple-500' },
    { label: 'Cancelled', value: appointments.filter(apt => apt.status === 'cancelled').length, color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.profile?.full_name || 'Patient'}!
          </h1>
          <p className="text-gray-600 mt-2">Manage your healthcare appointments and records</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-lg">{stat.value}</span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <button className="text-sky-600 hover:text-sky-700 font-medium">View All</button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading appointments...</p>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            src={appointment.doctor?.user?.profile_image_url || 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'}
                            alt={appointment.doctor?.user?.full_name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.doctor?.user?.full_name}</h3>
                            <p className="text-sky-600 text-sm">{appointment.doctor?.specialty}</p>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.appointment_date).toLocaleDateString()}
                              <Clock className="h-4 w-4 ml-3 mr-1" />
                              {appointment.appointment_time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {appointment.method === 'video' && <Video className="h-5 w-5 text-sky-500" />}
                          {appointment.method === 'phone' && <Phone className="h-5 w-5 text-emerald-500" />}
                          {appointment.method === 'in_person' && <MapPin className="h-5 w-5 text-purple-500" />}
                          
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' 
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-600 mb-4">Schedule your next consultation with a healthcare professional</p>
                  <button className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors">
                    Find a Doctor
                  </button>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Consultation with {appointment.doctor?.user?.full_name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {new Date(appointment.appointment_date).toLocaleDateString()} - Completed
                      </p>
                    </div>
                    <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors flex items-center">
                  <Calendar className="h-5 w-5 text-sky-600 mr-3" />
                  <span className="font-medium text-sky-700">Book Appointment</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors flex items-center">
                  <MessageSquare className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-700">Symptom Checker</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors flex items-center">
                  <Video className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="font-medium text-emerald-700">Telehealth</span>
                </button>
              </div>
            </div>

            {/* Health Reminders */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Reminders</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-xl">
                  <Bell className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">Annual Checkup Due</p>
                    <p className="text-yellow-600 text-sm">Schedule your yearly health screening</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-xl">
                  <Bell className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-blue-800">Vaccination Reminder</p>
                    <p className="text-blue-600 text-sm">COVID-19 booster available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{user?.profile?.full_name}</p>
                    <p className="text-gray-600 text-sm">{user?.profile?.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-900">{user?.profile?.district || 'Location not set'}</p>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;