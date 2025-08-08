import { Injectable, signal, computed } from '@angular/core';
import {
  FitnessCenter,
  FitnessClass,
} from '../interfaces/class-store.interface';

@Injectable({ providedIn: 'root' })
export class ClassStoreService {
  classes = signal<FitnessClass[]>([]);
  centers = signal<FitnessCenter[]>([]);

  private mockCenters: FitnessCenter[] = [
    {
      id: '1',
      name: 'FitZone Centro',
      address: 'Calle Gran Vía 25',
      city: 'Madrid',
      phone: '+34 911 234 567',
      facilities: ['Piscina', 'Sauna', 'Zona CrossFit', 'Sala Spinning'],
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'FitZone Norte',
      address: 'Avenida de la Castellana 100',
      city: 'Madrid',
      phone: '+34 911 234 568',
      facilities: ['Piscina Olímpica', 'Spa', 'Zona Funcional', 'Boxing Ring'],
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    },
  ];

  private mockClasses: FitnessClass[] = [
    {
      id: '1',
      name: 'CrossFit Intenso',
      description:
        'Entrenamiento funcional de alta intensidad que combina fuerza, resistencia y flexibilidad.',
      instructor: 'Miguel Rodríguez',
      duration: 60,
      intensity: 'advanced',
      category: 'crossfit',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      maxCapacity: 15,
      currentEnrollment: 12,
      price: 25000,
      centerId: '1',
      schedule: [
        {
          id: 's1',
          classId: '1',
          date: '2024-01-15',
          startTime: '18:00',
          endTime: '19:00',
          availableSpots: 3,
        },
      ],
    },
    {
      id: '2',
      name: 'Yoga Relajante',
      description:
        'Sesión de yoga enfocada en relajación y flexibilidad para todos los niveles.',
      instructor: 'Carmen Silva',
      duration: 75,
      intensity: 'beginner',
      category: 'yoga',
      image:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      maxCapacity: 20,
      currentEnrollment: 8,
      price: 30000,
      centerId: '1',
      schedule: [
        {
          id: 's2',
          classId: '2',
          date: '2024-01-15',
          startTime: '19:30',
          endTime: '20:45',
          availableSpots: 12,
        },
      ],
    },
    {
      id: '3',
      name: 'Spinning Power',
      description:
        'Clase de cycling indoor con música motivadora y entrenamientos por intervalos.',
      instructor: 'David Martín',
      duration: 45,
      intensity: 'intermediate',
      category: 'spinning',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      maxCapacity: 25,
      currentEnrollment: 20,
      price: 20000,
      centerId: '2',
      schedule: [
        {
          id: 's3',
          classId: '3',
          date: '2024-01-16',
          startTime: '07:00',
          endTime: '07:45',
          availableSpots: 5,
        },
      ],
    },
  ];

  constructor() {
    this._verifyClassesStorage();
  }

  private _verifyClassesStorage(): void {
    const saved = localStorage.getItem('fitzone-classes');
    if (saved) {
      const data = JSON.parse(saved);
      this.classes.set(data.classes || []);
      this.centers.set(data.centers || []);
    } else {
      this.classes.set(this.mockClasses);
      this.centers.set(this.mockCenters);
    }
  }
}
