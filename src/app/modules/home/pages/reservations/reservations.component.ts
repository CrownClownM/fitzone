import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@auth/interfaces/auth.interfce';
import { AuthService } from '@auth/services/auth.service';
import { Booking } from '@home/interfaces/booking.interface';
import {
  FitnessCenter,
  FitnessClass,
} from '@home/interfaces/class-store.interface';
import { ClassStoreService } from '@home/services/class-store.service';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { CardReservationComponent } from '../../components/card-reservation/card-reservation.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservations',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    NgTemplateOutlet,
    MatButtonModule,
    LoaderComponent,
    CardReservationComponent,
    MatDialogModule,
    RouterLink
  ],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  bookings: Booking[] = [];
  classes: FitnessClass[] = [];
  centers: FitnessCenter[] = [];
  user: User | null = null;
  isAuthenticated = false;
  loading = true;

  private _classStore = inject(ClassStoreService);
  private _authService = inject(AuthService);

  constructor() {
    this._initializeReactivity();
  }

  /**
   * Inicializa la reactividad de los datos.
   */
  private _initializeReactivity(): void {
    effect(() => {
      this.bookings = this._classStore.bookings();
      this.classes = this._classStore.classes();
      this.centers = this._classStore.centers();
      if (
        this.loading &&
        (this.classes.length > 0 || this.centers.length > 0)
      ) {
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.user = this._authService.user();
    this.isAuthenticated = this._authService.isAuthenticated();
  }

  /**
   * Obtiene las reservas del usuario actual.
   * @returns Reservas del usuario.
   */
  get userBookings(): Booking[] {
    return this.bookings.filter((b) => b.userId === this.user?.id);
  }

  /**
   * Obtiene los detalles de una clase específica.
   * @param classId ID de la clase.
   * @returns Detalles de la clase o undefined si no se encuentra.
   */
  getClassDetails(classId: string): FitnessClass | undefined {
    return this.classes.find((c) => c.id === classId);
  }

  /**
   * Obtiene los detalles de un centro de fitness específico.
   * @param centerId ID del centro.
   * @returns Detalles del centro o undefined si no se encuentra.
   */
  getCenterDetails(centerId: string): FitnessCenter | undefined {
    return this.centers.find((c) => c.id === centerId);
  }
}
