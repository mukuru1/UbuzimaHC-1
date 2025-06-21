import React from 'react';
import { Search, MapPin, Calendar, MessageCircle, Stethoscope, Clock, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { setCurrentView } = useApp();

  const features = [
    {
      icon: Search,
      title: 'Find Doctors',
      description: 'Search by specialty, location, and language',
      action: () => setCurrentView('doctors'),
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      title: 'Book Appointments',
      description: 'Schedule in-person or phone consultations',
      action: () => setCurrentView('doctors'),
      color: 'bg-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Symptom Checker',
      description: 'Get instant health guidance',
      action: () => setCurrentView('symptoms'),
      color: 'bg-purple-500'
    },
    {
      icon: Stethoscope,
      title: 'Telehealth',
      description: 'Virtual consultations with doctors',
      action: () => setCurrentView('telehealth'),
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Doctors' },
    { number: '50+', label: 'Hospitals' },
    { number: '10k+', label: 'Patients' },
    { number: '4.8★', label: 'Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Health,{' '}
              <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with trusted healthcare professionals across Rwanda. Book appointments, 
              get health guidance, and access quality care from anywhere.
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search doctors, specialties..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Kigali, Butare..."
                      className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <button 
                    onClick={() => setCurrentView('doctors')}
                    className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-sky-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Made Simple</h2>
          <p className="text-lg text-gray-600">Everything you need for better health, in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.action}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 group"
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-sky-500 to-emerald-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sky-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <Clock className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Emergency?</h2>
          <p className="text-xl mb-8 opacity-90">
            Need immediate medical attention? Contact emergency services or visit the nearest hospital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:912"
              className="bg-white text-red-500 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Call Emergency: 912
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-500 transition-colors duration-200">
              Find Nearest Hospital
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;