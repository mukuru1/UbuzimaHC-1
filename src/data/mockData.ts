import { Doctor, Clinic } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Marie Uwimana',
    specialty: 'General Practitioner',
    hospital: 'King Faisal Hospital',
    rating: 4.8,
    reviewCount: 124,
    experience: 8,
    languages: ['Kinyarwanda', 'French', 'English'],
    licenseNumber: 'RW-GP-001234',
    profileImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 15000,
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['09:00', '10:00', '11:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['09:00', '10:00', '11:00', '14:00']
    },
    bio: 'Experienced general practitioner with focus on preventive care and community health.',
    qualifications: ['MD - University of Rwanda', 'Certificate in Public Health'],
    location: {
      lat: -1.9441,
      lng: 30.0619,
      address: 'KG 544 St, Kigali'
    }
  },
  {
    id: '2',
    name: 'Dr. Jean Baptiste Nzeyimana',
    specialty: 'Pediatrician',
    hospital: 'University Teaching Hospital of Kigali',
    rating: 4.9,
    reviewCount: 89,
    experience: 12,
    languages: ['Kinyarwanda', 'French', 'English'],
    licenseNumber: 'RW-PED-005678',
    profileImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 20000,
    availability: {
      'Monday': ['08:00', '09:00', '10:00', '14:00'],
      'Tuesday': ['08:00', '09:00', '10:00', '14:00'],
      'Wednesday': ['08:00', '09:00', '10:00'],
      'Thursday': ['08:00', '09:00', '10:00', '14:00'],
      'Friday': ['08:00', '09:00', '10:00']
    },
    bio: 'Specialized in child healthcare with expertise in infectious diseases and malnutrition.',
    qualifications: ['MD - Pediatrics', 'Fellowship in Infectious Diseases'],
    location: {
      lat: -1.9706,
      lng: 30.1044,
      address: 'KK 737 St, Kigali'
    }
  },
  {
    id: '3',
    name: 'Dr. Grace Mukamana',
    specialty: 'Gynecologist',
    hospital: 'Rwanda Military Hospital',
    rating: 4.7,
    reviewCount: 156,
    experience: 10,
    languages: ['Kinyarwanda', 'English'],
    licenseNumber: 'RW-GYN-009012',
    profileImage: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 25000,
    availability: {
      'Monday': ['10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['10:00', '11:00'],
      'Thursday': ['10:00', '11:00', '14:00', '15:00'],
      'Friday': ['10:00', '11:00']
    },
    bio: 'Women\'s health specialist focusing on maternal care and reproductive health.',
    qualifications: ['MD - Obstetrics & Gynecology', 'Advanced Laparoscopy Certificate'],
    location: {
      lat: -1.9578,
      lng: 30.1127,
      address: 'KN 67 St, Kigali'
    }
  },
  {
    id: '4',
    name: 'Dr. Paul Habimana',
    specialty: 'Dentist',
    hospital: 'Dental Care Rwanda',
    rating: 4.6,
    reviewCount: 92,
    experience: 6,
    languages: ['Kinyarwanda', 'French', 'English'],
    licenseNumber: 'RW-DEN-003456',
    profileImage: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    consultationFee: 12000,
    availability: {
      'Monday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['08:00', '09:00', '10:00', '11:00'],
      'Thursday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['08:00', '09:00', '10:00', '11:00']
    },
    bio: 'General dentist specializing in preventive care and cosmetic dentistry.',
    qualifications: ['DDS - University of Rwanda', 'Certificate in Cosmetic Dentistry'],
    location: {
      lat: -1.9512,
      lng: 30.0588,
      address: 'KG 15 Ave, Kigali'
    }
  }
];

export const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'King Faisal Hospital',
    type: 'public',
    address: 'KG 544 St, Kigali',
    phone: '+250 788 123 456',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'],
    rating: 4.5,
    location: { lat: -1.9441, lng: 30.0619 }
  },
  {
    id: '2',
    name: 'University Teaching Hospital of Kigali',
    type: 'public',
    address: 'KK 737 St, Kigali',
    phone: '+250 788 234 567',
    services: ['Emergency', 'Surgery', 'Oncology', 'Cardiology'],
    rating: 4.3,
    location: { lat: -1.9706, lng: 30.1044 }
  },
  {
    id: '3',
    name: 'Rwanda Military Hospital',
    type: 'public',
    address: 'KN 67 St, Kigali',
    phone: '+250 788 345 678',
    services: ['Emergency', 'Surgery', 'Rehabilitation', 'Mental Health'],
    rating: 4.4,
    location: { lat: -1.9578, lng: 30.1127 }
  }
];

export const specialties = [
  'General Practitioner',
  'Pediatrician',
  'Gynecologist',
  'Dentist',
  'Cardiologist',
  'Dermatologist',
  'Orthopedist',
  'Psychiatrist',
  'Ophthalmologist',
  'ENT Specialist'
];

export const commonConditions = [
  {
    name: 'Malaria',
    symptoms: ['fever', 'chills', 'headache', 'nausea'],
    severity: 'high' as const,
    recommendation: 'Seek immediate medical attention. Visit the nearest clinic for malaria testing.'
  },
  {
    name: 'Common Cold',
    symptoms: ['cough', 'runny nose', 'sore throat', 'fatigue'],
    severity: 'low' as const,
    recommendation: 'Rest, drink plenty of fluids, and monitor symptoms. Visit a doctor if symptoms worsen.'
  },
  {
    name: 'UTI',
    symptoms: ['painful urination', 'frequent urination', 'lower abdominal pain'],
    severity: 'medium' as const,
    recommendation: 'Schedule an appointment with a doctor for proper diagnosis and treatment.'
  },
  {
    name: 'Typhoid',
    symptoms: ['high fever', 'headache', 'abdominal pain', 'diarrhea'],
    severity: 'high' as const,
    recommendation: 'Seek immediate medical attention. This requires urgent treatment.'
  }
];