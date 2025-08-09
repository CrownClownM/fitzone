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
  bookings = signal<any[]>([]);
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

  private async _initializeData(): Promise<void> {
    try {
      const centers = await this._indexedDbService.getAllCenters();
      const classes = await this._indexedDbService.getAllClasses();

      this.centers.set(centers);
      this.classes.set(classes);

      // Cargar reservas desde localStorage si existen
      const savedBookings = localStorage.getItem('fitzone-bookings');
      if (savedBookings) {
        this.bookings.set(JSON.parse(savedBookings));
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }

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

  setFilters(
    filters: Partial<{ category: string; intensity: string; centerId: string }>
  ) {
    this.selectedFilters.update((current) => ({ ...current, ...filters }));
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  bookClass(classId: string): boolean {
    const newBooking: Booking = {
      id: Date.now().toString(),
      userId: this._authService.user()?.id!,
      classId,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'paid',
    };
    this.bookings.update((b) => [...b, newBooking]);
    this._saveBookingsToStorage();
    return true;
  }

  cancelBooking(bookingId: string) {
    this.bookings.update((b) =>
      b.filter((booking) => booking.id !== bookingId)
    );
    this._saveBookingsToStorage();
  }

  private _saveBookingsToStorage(): void {
    localStorage.setItem('fitzone-bookings', JSON.stringify(this.bookings()));
  }
}
