import { FitnessClass } from '@home/interfaces/class-store.interface';

export const MOCK_CLASSES: FitnessClass[] = [
  {
    id: '1',
    name: 'CrossFit Intenso',
    description: 'Entrenamiento funcional de alta intensidad que combina fuerza, resistencia y flexibilidad.',
    instructor: 'Miguel Rodríguez',
    duration: 60,
    intensity: 'advanced',
    category: 'crossfit',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    maxCapacity: 15,
    currentEnrollment: 12,
    price: 25000,
    centerId: '1',
    schedule: [
      { id: 's1', classId: '1', date: '2024-01-15', startTime: '18:00', endTime: '19:00', availableSpots: 3 }
    ]
  },
  {
    id: '2',
    name: 'Yoga Relajante',
    description: 'Sesión de yoga enfocada en relajación y flexibilidad para todos los niveles.',
    instructor: 'Carmen Silva',
    duration: 75,
    intensity: 'beginner',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    maxCapacity: 20,
    currentEnrollment: 8,
    price: 30000,
    centerId: '1',
    schedule: [
      { id: 's2', classId: '2', date: '2024-01-15', startTime: '19:30', endTime: '20:45', availableSpots: 12 }
    ]
  },
  {
    id: '3',
    name: 'Spinning Power',
    description: 'Clase de cycling indoor con música motivadora y entrenamientos por intervalos.',
    instructor: 'David Martín',
    duration: 45,
    intensity: 'intermediate',
    category: 'spinning',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    maxCapacity: 25,
    currentEnrollment: 20,
    price: 20000,
    centerId: '2',
    schedule: [
      { id: 's3', classId: '3', date: '2024-01-16', startTime: '07:00', endTime: '07:45', availableSpots: 5 }
    ]
  },
  {
    id: '4',
    name: 'Pilates Core',
    description: 'Fortalecimiento del core y mejora de la postura con ejercicios de pilates.',
    instructor: 'Laura Fernández',
    duration: 50,
    intensity: 'beginner',
    category: 'pilates',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    maxCapacity: 15,
    currentEnrollment: 10,
    price: 22000,
    centerId: '3',
    schedule: [
      { id: 's4', classId: '4', date: '2024-01-16', startTime: '09:00', endTime: '09:50', availableSpots: 5 }
    ]
  },
  {
    id: '5',
    name: 'Boxing Fitness',
    description: 'Entrenamiento de boxeo para mejorar cardio, fuerza y coordinación.',
    instructor: 'Carlos Torres',
    duration: 55,
    intensity: 'intermediate',
    category: 'boxing',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop',
    maxCapacity: 12,
    currentEnrollment: 9,
    price: 28000,
    centerId: '4',
    schedule: [
      { id: 's5', classId: '5', date: '2024-01-17', startTime: '18:30', endTime: '19:25', availableSpots: 3 }
    ]
  },
  {
    id: '6',
    name: 'Yoga Vinyasa',
    description: 'Yoga dinámico que sincroniza movimiento y respiración.',
    instructor: 'Ana Martínez',
    duration: 70,
    intensity: 'intermediate',
    category: 'yoga',
    image: 'https://images.unsplash.com/photo-1506629905607-c503c8b7b5cb?w=400&h=300&fit=crop',
    maxCapacity: 18,
    currentEnrollment: 14,
    price: 20000,
    centerId: '1',
    schedule: [
      { id: 's6', classId: '6', date: '2024-01-17', startTime: '10:00', endTime: '11:10', availableSpots: 4 }
    ]
  },
  {
    id: '7',
    name: 'Functional Training',
    description: 'Entrenamiento funcional para mejorar fuerza, equilibrio y agilidad.',
    instructor: 'Roberto Sánchez',
    duration: 45,
    intensity: 'advanced',
    category: 'functional',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop',
    maxCapacity: 14,
    currentEnrollment: 11,
    price: 24000,
    centerId: '2',
    schedule: [
      { id: 's7', classId: '7', date: '2024-01-18', startTime: '17:00', endTime: '17:45', availableSpots: 3 }
    ]
  },
  {
    id: '8',
    name: 'Aqua Fitness',
    description: 'Ejercicios aeróbicos en el agua para un entrenamiento de bajo impacto.',
    instructor: 'Patricia López',
    duration: 40,
    intensity: 'beginner',
    category: 'functional',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop',
    maxCapacity: 16,
    currentEnrollment: 7,
    price: 16000,
    centerId: '3',
    schedule: [
      { id: 's8', classId: '8', date: '2024-01-18', startTime: '11:00', endTime: '11:40', availableSpots: 9 }
    ]
  },
  {
    id: '9',
    name: 'CrossFit Beginners',
    description: 'Introducción al CrossFit para principiantes con ejercicios escalados.',
    instructor: 'Javier Ruiz',
    duration: 50,
    intensity: 'beginner',
    category: 'crossfit',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop',
    maxCapacity: 12,
    currentEnrollment: 8,
    price: 20000,
    centerId: '4',
    schedule: [
      { id: 's9', classId: '9', date: '2024-01-19', startTime: '16:00', endTime: '16:50', availableSpots: 4 }
    ]
  },
  {
    id: '10',
    name: 'Spinning Cardio',
    description: 'Sesión de spinning enfocada en quemar calorías y mejorar resistencia.',
    instructor: 'Elena García',
    duration: 40,
    intensity: 'intermediate',
    category: 'spinning',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    maxCapacity: 20,
    currentEnrollment: 16,
    price: 18000,
    centerId: '1',
    schedule: [
      { id: 's10', classId: '10', date: '2024-01-19', startTime: '19:00', endTime: '19:40', availableSpots: 4 }
    ]
  },
  {
    id: '11',
    name: 'Pilates Avanzado',
    description: 'Pilates de nivel avanzado con ejercicios más desafiantes.',
    instructor: 'Sandra Morales',
    duration: 60,
    intensity: 'advanced',
    category: 'pilates',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    maxCapacity: 10,
    currentEnrollment: 7,
    price: 26000,
    centerId: '3',
    schedule: [
      { id: 's11', classId: '11', date: '2024-01-20', startTime: '08:00', endTime: '09:00', availableSpots: 3 }
    ]
  },
  {
    id: '12',
    name: 'Boxing Elite',
    description: 'Entrenamiento de boxeo avanzado con técnicas profesionales.',
    instructor: 'Manuel Jiménez',
    duration: 65,
    intensity: 'advanced',
    category: 'boxing',
    image: 'https://images.unsplash.com/photo-1517438984742-1262db08379e?w=400&h=300&fit=crop',
    maxCapacity: 8,
    currentEnrollment: 6,
    price: 32000,
    centerId: '4',
    schedule: [
      { id: 's12', classId: '12', date: '2024-01-20', startTime: '20:00', endTime: '21:05', availableSpots: 2 }
    ]
  }
];
