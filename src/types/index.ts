export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviewCount: number;
  experience: number;
  languages: string[];
  licenseNumber: string;
  profileImage: string;
  consultationFee: number;
  availability: {
    [key: string]: string[];
  };
  bio: string;
  qualifications: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Clinic {
  id: string;
  name: string;
  type: 'public' | 'private';
  address: string;
  phone: string;
  services: string[];
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'in-person' | 'phone' | 'video';
  status: 'scheduled' | 'completed' | 'cancelled';
  fee: number;
}

export interface SymptomCheckerResponse {
  condition: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
  description: string;
}

export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}