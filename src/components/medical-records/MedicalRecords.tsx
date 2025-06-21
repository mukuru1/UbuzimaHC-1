import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, User, Stethoscope, Pill, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const MedicalRecords: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('records');

  // Mock medical records data
  const medicalRecords = [
    {
      id: '1',
      title: 'General Checkup',
      date: '2024-01-10',
      doctor: 'Dr. Marie Uwimana',
      type: 'Consultation',
      diagnosis: 'Routine health screening - All normal',
      treatment: 'Continue healthy lifestyle, annual follow-up recommended',
      attachments: ['blood_test_results.pdf', 'chest_xray.jpg']
    },
    {
      id: '2',
      title: 'Dental Cleaning',
      date: '2024-01-05',
      doctor: 'Dr. Paul Habimana',
      type: 'Dental',
      diagnosis: 'Good oral health, minor plaque buildup',
      treatment: 'Professional cleaning completed, fluoride treatment applied',
      attachments: ['dental_xray.jpg']
    },
    {
      id: '3',
      title: 'Heart Consultation',
      date: '2023-12-20',
      doctor: 'Dr. Alice Murenzi',
      type: 'Cardiology',
      diagnosis: 'Normal heart function, slight elevation in blood pressure',
      treatment: 'Lifestyle modifications, monitor blood pressure weekly',
      attachments: ['ecg_results.pdf', 'echo_report.pdf']
    }
  ];

  const prescriptions = [
    {
      id: '1',
      medication: 'Paracetamol 500mg',
      dosage: '1 tablet every 6 hours',
      duration: '5 days',
      prescribedBy: 'Dr. Marie Uwimana',
      date: '2024-01-10',
      status: 'Active'
    },
    {
      id: '2',
      medication: 'Vitamin D3 1000IU',
      dosage: '1 tablet daily',
      duration: '30 days',
      prescribedBy: 'Dr. Marie Uwimana',
      date: '2024-01-10',
      status: 'Active'
    },
    {
      id: '3',
      medication: 'Amoxicillin 250mg',
      dosage: '1 capsule twice daily',
      duration: '7 days',
      prescribedBy: 'Dr. Jean Baptiste Nzeyimana',
      date: '2023-12-15',
      status: 'Completed'
    }
  ];

  const labResults = [
    {
      id: '1',
      test: 'Complete Blood Count (CBC)',
      date: '2024-01-10',
      status: 'Normal',
      orderedBy: 'Dr. Marie Uwimana',
      results: {
        'Hemoglobin': '14.2 g/dL (Normal)',
        'White Blood Cells': '6,800/μL (Normal)',
        'Platelets': '285,000/μL (Normal)'
      }
    },
    {
      id: '2',
      test: 'Lipid Panel',
      date: '2024-01-10',
      status: 'Normal',
      orderedBy: 'Dr. Marie Uwimana',
      results: {
        'Total Cholesterol': '180 mg/dL (Normal)',
        'HDL Cholesterol': '55 mg/dL (Normal)',
        'LDL Cholesterol': '110 mg/dL (Normal)',
        'Triglycerides': '120 mg/dL (Normal)'
      }
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to view your medical records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
          <p className="text-gray-600">View and manage your health information</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('records')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'records'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Records
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'prescriptions'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Prescriptions
          </button>
          <button
            onClick={() => setActiveTab('lab-results')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'lab-results'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lab Results
          </button>
        </div>

        {/* Medical Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            {medicalRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-xl">
                      <FileText className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{record.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {record.doctor}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {record.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-sky-600 hover:text-sky-700">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                    <p className="text-gray-600">{record.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                    <p className="text-gray-600">{record.treatment}</p>
                  </div>
                </div>

                {record.attachments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {record.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {attachment}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <Pill className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{prescription.medication}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(prescription.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Stethoscope className="h-4 w-4 mr-1" />
                          {prescription.prescribedBy}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    prescription.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {prescription.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dosage</h4>
                    <p className="text-gray-600">{prescription.dosage}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{prescription.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'lab-results' && (
          <div className="space-y-6">
            {labResults.map((result) => (
              <div key={result.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{result.test}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(result.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {result.orderedBy}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {result.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(result.results).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'records' && medicalRecords.length === 0) ||
          (activeTab === 'prescriptions' && prescriptions.length === 0) ||
          (activeTab === 'lab-results' && labResults.length === 0)) && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Records Found</h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'records' && 'Your medical records will appear here after your appointments.'}
              {activeTab === 'prescriptions' && 'Your prescriptions will appear here when doctors prescribe medications.'}
              {activeTab === 'lab-results' && 'Your lab results will appear here when tests are completed.'}
            </p>
            <button className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors">
              <Plus className="h-5 w-5 mr-2 inline" />
              Schedule Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;