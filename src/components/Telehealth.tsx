import React, { useState } from 'react';
import { Video, Phone, MessageSquare, Calendar, Clock, User, Star } from 'lucide-react';
import { mockDoctors } from '../data/mockData';

const Telehealth: React.FC = () => {
  const [activeConsultation, setActiveConsultation] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | 'chat'>('video');

  const upcomingConsultations = [
    {
      id: '1',
      doctor: mockDoctors[0],
      date: 'Today',
      time: '2:30 PM',
      type: 'video' as const,
      status: 'scheduled' as const
    },
    {
      id: '2',
      doctor: mockDoctors[1],
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'phone' as const,
      status: 'scheduled' as const
    }
  ];

  const ConsultationRoom = () => (
    <div className="bg-gray-900 rounded-2xl overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-16 w-16" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Dr. Marie Uwimana</h3>
          <p className="text-gray-300">Connecting...</p>
        </div>
      </div>
      
      <div className="p-4 bg-gray-800">
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Telehealth</h1>
          <p className="text-gray-600">Connect with healthcare professionals from anywhere</p>
        </div>

        {activeConsultation ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setActiveConsultation(null)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to consultations
              </button>
            </div>
            <ConsultationRoom />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Consultation Options */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Start a Consultation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group">
                  <div className="bg-sky-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Call</h3>
                  <p className="text-gray-600 mb-4">Face-to-face consultation with your doctor</p>
                  <button className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors">
                    Start Video Call
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group">
                  <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Call</h3>
                  <p className="text-gray-600 mb-4">Voice consultation for rural areas</p>
                  <button className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                    Start Phone Call
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group">
                  <div className="bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat</h3>
                  <p className="text-gray-600 mb-4">Text-based consultation</p>
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Start Chat
                  </button>
                </div>
              </div>

              {/* Available Doctors */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Now</h3>
                <div className="space-y-4">
                  {mockDoctors.slice(0, 3).map((doctor) => (
                    <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.profileImage}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                          <p className="text-sky-600">{doctor.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{doctor.rating} ({doctor.reviewCount})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            {doctor.consultationFee.toLocaleString()} RWF
                          </div>
                          <button
                            onClick={() => setActiveConsultation(doctor.id)}
                            className="mt-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm"
                          >
                            Consult Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Upcoming Consultations */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
                <div className="space-y-4">
                  {upcomingConsultations.map((consultation) => (
                    <div key={consultation.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <img
                          src={consultation.doctor.profileImage}
                          alt={consultation.doctor.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{consultation.doctor.name}</p>
                          <p className="text-sm text-gray-600">{consultation.doctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {consultation.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {consultation.time}
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveConsultation(consultation.id)}
                        className="w-full mt-3 py-2 border border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
                      >
                        Join Consultation
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    📋 Upload Medical Records
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    💊 Request Prescription Refill
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    📅 Reschedule Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Telehealth;