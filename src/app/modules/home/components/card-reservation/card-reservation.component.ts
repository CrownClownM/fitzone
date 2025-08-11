import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClassStoreService } from '@home/services/class-store.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '@shared/interfaces/confirmationDialog.interface';
import { Booking } from '@home/interfaces/booking.interface';
import {
  FitnessCenter,
  FitnessClass,
} from '@home/interfaces/class-store.interface';

@Component({
  selector: 'app-card-reservation',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    CurrencyPipe,
    MatDialogModule,
  ],
  templateUrl: './card-reservation.component.html',
  styleUrls: ['./card-reservation.component.scss'],
})
export class CardReservationComponent {
  @Input({ required: true }) booking!: Booking;
  @Input({ required: true }) klass!: FitnessClass;
  @Input({ required: true }) center!: FitnessCenter | undefined;

  get intensityLabel(): string {
    switch (this.klass?.intensity) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return '';
    }
  }

  private _dialog = inject(MatDialog);
  private _classStore = inject(ClassStoreService);

  /**
   * Maneja la cancelación de la reserva.
   */
  onCancel(): void {
    const data: ConfirmDialogData = {
      title: 'Cancelar reserva',
      message: `¿Deseas cancelar la reserva de "${
        this.klass?.name || 'esta clase'
      }"? Esta acción no se puede deshacer.`,
      icon: 'warning',
    };
    const ref = this._dialog.open(ConfirmDialogComponent, { data });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this._classStore.cancelBooking(this.booking.id);
      }
    });
  }
}
