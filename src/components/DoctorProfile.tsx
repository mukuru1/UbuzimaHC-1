import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Languages, Award, Calendar, Video, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DoctorProfile: React.FC = () => {
  const { selectedDoctor, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedDoctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>No doctor selected</p>
      </div>
    );
  }

  const doctor = selectedDoctor;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('doctors')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-sky-600 font-semibold mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-3">{doctor.hospital}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">({doctor.reviewCount} reviews)</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{doctor.location.address}</span>
                  </div>

                  <div className="flex items-center">
                    <Languages className="h-5 w-5 mr-2 text-gray-600" />
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setCurrentView('booking')}
                  className="flex items-center justify-center px-6 py-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors font-semibold"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Video Consultation
                </button>
                <button
                  onClick={() => setCurrentView('booking')}
                  className="flex items-center justify-center px-6 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Phone Consultation
                </button>
                <button
                  onClick={() => setCurrentView('booking')}
                  className="flex items-center justify-center px-6 py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  In-Person Visit
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {['overview', 'qualifications', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-sky-500 text-sky-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About Dr. {doctor.name.split(' ')[1]}</h3>
                  <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                </div>
              )}

              {activeTab === 'qualifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications & Certifications</h3>
                  <div className="space-y-3">
                    {doctor.qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="h-5 w-5 text-sky-500 mr-3" />
                        <span className="text-gray-700">{qualification}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">
                      <strong>Medical License:</strong> {doctor.licenseNumber}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Reviews</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">Patient #{review}</span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          Excellent doctor with great bedside manner. Very thorough and professional.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">2 weeks ago</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Consultation Fee */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Fee</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {doctor.consultationFee.toLocaleString()} RWF
                </div>
                <p className="text-gray-600 text-sm">Per consultation</p>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Availability</h3>
              <div className="space-y-3">
                {Object.entries(doctor.availability).map(([day, times]) => (
                  <div key={day}>
                    <div className="font-medium text-gray-900 mb-1">{day}</div>
                    <div className="flex flex-wrap gap-1">
                      {times.slice(0, 3).map((time, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-200"
                        >
                          {time}
                        </span>
                      ))}
                      {times.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                          +{times.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentView('booking')}
                className="w-full mt-6 bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-sky-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;