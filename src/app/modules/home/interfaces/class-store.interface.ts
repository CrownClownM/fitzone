export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FitnessCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  facilities: string[];
  image: string;
}

export interface FitnessClass {
  id: string;
  name: string;
  description: string;
  instructor: string;
  duration: number;
  intensity: 'beginner' | 'intermediate' | 'advanced';
  category: 'crossfit' | 'yoga' | 'spinning' | 'pilates' | 'boxing' | 'functional';
  image: string;
  maxCapacity: number;
  currentEnrollment: number;
  price: number;
  centerId: string;
  schedule: ClassSession[];
}

export interface ClassSession {
  id: string;
  classId: string;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
}
