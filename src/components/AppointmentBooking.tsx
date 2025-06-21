import React, { useState } from 'react';
import { Calendar, Clock, ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AppointmentBooking: React.FC = () => {
  const { selectedDoctor, setCurrentView } = useApp();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'in-person' | 'phone' | 'video'>('in-person');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | 'card'>('momo');
  const [step, setStep] = useState(1);

  if (!selectedDoctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>No doctor selected</p>
      </div>
    );
  }

  const doctor = selectedDoctor;

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleBooking = () => {
    // Here you would typically make an API call to book the appointment
    alert('Appointment booked successfully! You will receive an SMS confirmation.');
    setCurrentView('appointments');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentView('doctor-profile')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your consultation with {doctor.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-sky-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`flex-1 h-1 mx-4 ${
                        step > stepNumber ? 'bg-sky-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1: Select Date & Time */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
                  
                  {/* Consultation Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'in-person', label: 'In-Person', icon: '🏥' },
                        { value: 'phone', label: 'Phone Call', icon: '📞' },
                        { value: 'video', label: 'Video Call', icon: '📹' }
                      ].map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setConsultationType(type.value as any)}
                          className={`p-4 rounded-xl border-2 transition-colors ${
                            consultationType === type.value
                              ? 'border-sky-500 bg-sky-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="font-medium">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                    <div className="grid grid-cols-7 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                          className={`p-3 rounded-xl border transition-colors ${
                            selectedDate === date.toISOString().split('T')[0]
                              ? 'border-sky-500 bg-sky-50 text-sky-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xs text-gray-600 mb-1">
                            {getDayName(date).slice(0, 3)}
                          </div>
                          <div className="font-semibold">{date.getDate()}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Available Times</label>
                      <div className="grid grid-cols-4 gap-3">
                        {doctor.availability[getDayName(new Date(selectedDate))]?.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border transition-colors ${
                              selectedTime === time
                                ? 'border-sky-500 bg-sky-50 text-sky-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { value: 'momo', label: 'MTN Mobile Money', icon: Smartphone, color: 'yellow' },
                      { value: 'airtel', label: 'Airtel Money', icon: Smartphone, color: 'red' },
                      { value: 'card', label: 'Credit/Debit Card', icon: CreditCard, color: 'blue' }
                    ].map((method) => (
                      <button
                        key={method.value}
                        onClick={() => setPaymentMethod(method.value as any)}
                        className={`w-full p-4 rounded-xl border-2 transition-colors flex items-center ${
                          paymentMethod === method.value
                            ? 'border-sky-500 bg-sky-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <method.icon className="h-6 w-6 mr-4 text-gray-600" />
                        <span className="font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'momo' && (
                    <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <p className="text-sm text-yellow-800 mb-2">
                        <strong>MTN Mobile Money Payment</strong>
                      </p>
                      <p className="text-sm text-yellow-700">
                        You will receive an SMS prompt to complete the payment of {doctor.consultationFee.toLocaleString()} RWF
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Confirm Appointment</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="font-medium">{doctor.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{consultationType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-semibold text-lg">{doctor.consultationFee.toLocaleString()} RWF</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBooking}
                      className="flex-1 bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-sky-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Doctor Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sky-600">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm">{doctor.hospital}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-lg">{doctor.consultationFee.toLocaleString()} RWF</span>
                </div>
              </div>
            </div>

            {/* Appointment Reminders */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">📱 SMS Reminders</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  24 hours before appointment
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  2 hours before appointment
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Payment confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;