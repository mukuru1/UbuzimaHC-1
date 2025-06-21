import React, { useState } from 'react';
import { Heart, Menu, User, Bell, X, Settings, LogOut, Calendar, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './auth/AuthModal';

const Header: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const { user, signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'doctors', label: 'Find Doctors', icon: null },
    { id: 'symptoms', label: 'Symptom Checker', icon: null },
    { id: 'telehealth', label: 'Telehealth', icon: null },
    { id: 'appointments', label: 'My Appointments', icon: null },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowProfileMenu(false);
      setCurrentView('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const notifications = [
    {
      id: '1',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Marie Uwimana tomorrow at 10:00 AM',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      title: 'Payment Confirmed',
      message: 'Your payment of 15,000 RWF has been confirmed',
      time: '1 day ago',
      unread: true
    },
    {
      id: '3',
      title: 'Health Tip',
      message: 'Remember to stay hydrated and get regular exercise',
      time: '2 days ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="bg-gradient-to-r from-sky-500 to-emerald-500 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Ubuzima</h1>
                <p className="text-xs text-gray-500">Healthcare Rwanda</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-center text-sky-600 hover:text-sky-700 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {user.profile?.profile_image_url ? (
                      <img 
                        src={user.profile.profile_image_url} 
                        alt={user.profile.full_name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="hidden sm:block font-medium">
                      {user.profile?.full_name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          {user.profile?.profile_image_url ? (
                            <img 
                              src={user.profile.profile_image_url} 
                              alt={user.profile.full_name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{user.profile?.full_name || 'User'}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-sky-600 capitalize">{user.profile?.role || 'patient'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button 
                          onClick={() => {
                            setCurrentView('profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <User className="h-4 w-4 mr-3" />
                          My Profile
                        </button>
                        
                        {user.profile?.role === 'patient' && (
                          <button 
                            onClick={() => {
                              setCurrentView('dashboard');
                              setShowProfileMenu(false);
                            }}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Calendar className="h-4 w-4 mr-3" />
                            Dashboard
                          </button>
                        )}
                        
                        <button 
                          onClick={() => {
                            setCurrentView('medical-records');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-3" />
                          Medical Records
                        </button>
                        
                        <button 
                          onClick={() => {
                            setCurrentView('settings');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-200 py-2">
                        <button 
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleAuthClick('signin')}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleAuthClick('signup')}
                    className="px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg font-medium hover:from-sky-600 hover:to-emerald-600 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setShowMobileMenu(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      {/* Click outside to close dropdowns */}
      {(showProfileMenu || showNotifications || showMobileMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Header;