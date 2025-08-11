import { Injectable } from '@angular/core';
import { User } from '@auth/interfaces/auth.interfce';
import { FitnessCenter, FitnessClass } from '@home/interfaces/class-store.interface';
import { MOCK_CENTERS } from '../data/mock-centers';
import { MOCK_CLASSES } from '../data/mock-classes';
import { Booking } from '@home/interfaces/booking.interface';
import { MOCK_USERS } from '../data/mock-users';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private _dbName = 'fitnessDB';
  private _userStoreName = 'users';
  private _centersStoreName = 'centers';
  private _classesStoreName = 'classes';
  private _bookingsStoreName = 'bookings';

  private _mockUsers: (User & { password: string })[] = MOCK_USERS;

  private _mockCenters: FitnessCenter[] = MOCK_CENTERS;
  private _mockClasses: FitnessClass[] = MOCK_CLASSES;

  constructor() {
    this._initDB();
  }

  /**
   * Inicializa la base de datos IndexedDB y asegura que los datos de prueba estén presentes.
   */
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
      if (!db.objectStoreNames.contains(this._bookingsStoreName)) {
        db.createObjectStore(this._bookingsStoreName, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      this._ensureMockData();
    };
  }

  /**
   * Asegura que los datos de prueba estén presentes en la base de datos.
   */
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

  /**
   * Guarda un usuario en la base de datos.
   * @param user Usuario a guardar.
   */
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

  /**
   * Guarda un centro en la base de datos.
   * @param center Centro a guardar.
   */
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

  /**
   * Guarda una clase en la base de datos.
   * @param fitnessClass Clase a guardar.
   */
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

  /**
   * Obtiene un usuario por su correo electrónico.
   * @param email Correo electrónico del usuario.
   * @returns Usuario encontrado o null si no existe.
   */
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

  /**
   * Obtiene todos los usuarios de la base de datos.
   * @returns Lista de usuarios.
   */
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

  /**
   * Obtiene todos los centros de la base de datos.
   * @returns Lista de centros.
   */
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

  /**
   * Obtiene todas las clases de la base de datos.
   * @returns Lista de clases.
   */
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

  /**
   * Guarda una reserva en la base de datos.
   * @param booking Reserva a guardar.
   */
  saveBooking(booking: Booking): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._bookingsStoreName], 'readwrite');
        const store = tx.objectStore(this._bookingsStoreName);
        store.put(booking);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Elimina una reserva de la base de datos.
   * @param bookingId ID de la reserva a eliminar.
   */
  deleteBooking(bookingId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._bookingsStoreName], 'readwrite');
        const store = tx.objectStore(this._bookingsStoreName);
        store.delete(bookingId);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Obtiene todas las reservas de la base de datos.
   * @returns Lista de reservas.
   */
  getAllBookings(): Promise<Booking[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this._bookingsStoreName], 'readonly');
        const store = tx.objectStore(this._bookingsStoreName);
        const bookings: Booking[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            bookings.push(cursor.value);
            cursor.continue();
          } else {
            resolve(bookings);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }
}
