import { Injectable } from '@angular/core';
import { User } from '@auth/interfaces/auth.interfce';
import { FitnessCenter, FitnessClass } from '@home/interfaces/class-store.interface';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private _dbName = 'fitnessDB';
  private _userStoreName = 'users';
  private _centersStoreName = 'centers';
  private _classesStoreName = 'classes';

  private _mockUsers: (User & { password: string })[] = [
    { id: '1', name: 'Test User', email: 'test@fitzone.com', password: 'password123' },
    { id: '2', name: 'Steven Medina', email: 'medina@fitzone.com', password: 'password123' }
  ];

  private _mockCenters: FitnessCenter[] = [
    {
      id: '1',
      name: 'FitZone Centro',
      address: 'Calle Gran Vía 25',
      city: 'Madrid',
      phone: '+34 911 234 567',
      facilities: ['Piscina', 'Sauna', 'Zona CrossFit', 'Sala Spinning'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'FitZone Norte',
      address: 'Avenida de la Castellana 100',
      city: 'Madrid',
      phone: '+34 911 234 568',
      facilities: ['Piscina Olímpica', 'Spa', 'Zona Funcional', 'Boxing Ring'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    },
  ];

  private _mockClasses: FitnessClass[] = [
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
    this._initDB();
  }

  private _initDB(): void {
    const request = indexedDB.open(this._dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this._userStoreName)) {
        db.createObjectStore(this._userStoreName, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(this._centersStoreName)) {
        db.createObjectStore(this._centersStoreName, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(this._classesStoreName)) {
        db.createObjectStore(this._classesStoreName, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      this._ensureMockData();
    };
  }

  private async _ensureMockData(): Promise<void> {
    const users = await this.getAllUsers();
    const centers = await this.getAllCenters();
    const classes = await this.getAllClasses();

    if (users.length === 0) {
      for (const user of this._mockUsers) {
        await this.saveUser(user);
      }
    }

    if (centers.length === 0) {
      for (const center of this._mockCenters) {
        await this.saveCenter(center);
      }
    }

    if (classes.length === 0) {
      for (const fitnessClass of this._mockClasses) {
        await this.saveClass(fitnessClass);
      }
    }
  }

  saveUser(user: User & { password: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._userStoreName], 'readwrite');
        const store = tx.objectStore(this._userStoreName);
        store.put(user);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  saveCenter(center: FitnessCenter): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._centersStoreName], 'readwrite');
        const store = tx.objectStore(this._centersStoreName);
        store.put(center);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  saveClass(fitnessClass: FitnessClass): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._classesStoreName], 'readwrite');
        const store = tx.objectStore(this._classesStoreName);
        store.put(fitnessClass);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._userStoreName], 'readonly');
        const store = tx.objectStore(this._userStoreName);

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            if (cursor.value.email === email) {
              resolve(cursor.value);
              return;
            }
            cursor.continue();
          } else {
            resolve(null);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  getAllUsers(): Promise<(User & { password: string })[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._userStoreName], 'readonly');
        const store = tx.objectStore(this._userStoreName);
        const users: (User & { password: string })[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            users.push(cursor.value);
            cursor.continue();
          } else {
            resolve(users);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  getAllCenters(): Promise<FitnessCenter[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._centersStoreName], 'readonly');
        const store = tx.objectStore(this._centersStoreName);
        const centers: FitnessCenter[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            centers.push(cursor.value);
            cursor.continue();
          } else {
            resolve(centers);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  getAllClasses(): Promise<FitnessClass[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._classesStoreName], 'readonly');
        const store = tx.objectStore(this._classesStoreName);
        const classes: FitnessClass[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            classes.push(cursor.value);
            cursor.continue();
          } else {
            resolve(classes);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }
}
