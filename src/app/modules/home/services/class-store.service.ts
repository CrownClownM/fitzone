import { Injectable, signal, computed, inject } from '@angular/core';
import {
  FitnessCenter,
  FitnessClass,
} from '../interfaces/class-store.interface';
import { Booking } from '@home/interfaces/booking.interface';
import { IndexedDbService } from '@core/services/indexed-db.service';
import { AuthService } from '@auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ClassStoreService {
  classes = signal<FitnessClass[]>([]);
  centers = signal<FitnessCenter[]>([]);
  bookings = signal<Booking[]>([]);
  selectedFilters = signal({
    category: '',
    intensity: '',
    centerId: '',
  });
  searchTerm = signal('');

  private _indexedDbService = inject(IndexedDbService);
  private _authService = inject(AuthService);

  constructor() {
    this._initializeData();
  }

  /**
   * Inicializa los datos.
   */
  private async _initializeData(): Promise<void> {
    try {
      const centers = await this._indexedDbService.getAllCenters();
      const classes = await this._indexedDbService.getAllClasses();
      const bookings = await this._indexedDbService.getAllBookings();

      this.centers.set(centers);
      this.classes.set(classes);
      this.bookings.set(bookings);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }

  /**
   * Clases filtradas
   */
  filteredClasses = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const filters = this.selectedFilters();
    return this.classes().filter((cls) => {
      const matchesSearch =
        !search ||
        cls.name.toLowerCase().includes(search) ||
        cls.instructor.toLowerCase().includes(search);

      const matchesCategory =
        !filters.category || cls.category === filters.category;
      const matchesIntensity =
        !filters.intensity || cls.intensity === filters.intensity;
      const matchesCenter =
        !filters.centerId || cls.centerId === filters.centerId;

      return (
        matchesSearch && matchesCategory && matchesIntensity && matchesCenter
      );
    });
  });

  setClasses(classes: FitnessClass[]) {
    this.classes.set(classes);
  }

  setCenters(centers: FitnessCenter[]) {
    this.centers.set(centers);
  }

  /**
   * Establece los filtros de búsqueda.
   * @param filters Filtros a aplicar.
   */
  setFilters(
    filters: Partial<{ category: string; intensity: string; centerId: string }>
  ) {
    this.selectedFilters.update((current) => ({ ...current, ...filters }));
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  /**
   * Reserva una clase para el usuario actual.
   * @param classId ID de la clase a reservar.
   * @returns Verdadero si la reserva fue exitosa, falso en caso contrario.
   */
  bookClass(classId: string): boolean {
    const userId = this._authService.user()?.id;
    if (!userId) return false;
    // Previene la reserva duplicada de la misma clase por el mismo usuario
    const alreadyBooked = this.bookings().some(
      (b) => b.userId === userId && b.classId === classId
    );
    if (alreadyBooked) {
      return false;
    }
    // Busca la clase y verifica la capacidad
    const targetClass = this.classes().find((c) => c.id === classId);
    if (!targetClass) return false;
    if (targetClass.currentEnrollment >= targetClass.maxCapacity) {
      return false;
    }
    const newBooking: Booking = {
      id: Date.now().toString(),
      userId,
      classId,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'paid',
    };
    this.bookings.update((b) => [...b, newBooking]);
    // Incrementa la inscripción
    const updatedClass = {
      ...targetClass,
      currentEnrollment: targetClass.currentEnrollment + 1,
    };
    this.classes.update((list) =>
      list.map((c) => (c.id === classId ? updatedClass : c))
    );
    this._indexedDbService
      .saveBooking(newBooking)
      .catch((e) => console.error('Error saving booking', e));
    this._indexedDbService
      .saveClass(updatedClass)
      .catch((e) => console.error('Error updating class enrollment', e));
    return true;
  }

  /**
   * Cancela una reserva para el usuario actual.
   * @param bookingId ID de la reserva a cancelar.
   */
  cancelBooking(bookingId: string) {
    const booking = this.bookings().find((b) => b.id === bookingId);
    if (!booking) return;
    const cls = this.classes().find((c) => c.id === booking.classId);
    this.bookings.update((b) => b.filter((item) => item.id !== bookingId));
    this._indexedDbService
      .deleteBooking(bookingId)
      .catch((e) => console.error('Error deleting booking', e));
    if (cls) {
      const newEnrollment = Math.max(0, cls.currentEnrollment - 1);
      const updated = { ...cls, currentEnrollment: newEnrollment };
      this.classes.update((list) =>
        list.map((c) => (c.id === cls.id ? updated : c))
      );
      this._indexedDbService
        .saveClass(updated)
        .catch((e) => console.error('Error updating class enrollment', e));
    }
  }
}
