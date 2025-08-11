import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FitnessCenter, FitnessClass } from '../../../modules/home/interfaces/class-store.interface';
import { ClassStoreService } from '../../../modules/home/services/class-store.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-class-card',
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent {
  @Input() fitnessClass!: FitnessClass;
  @Output() reserve = new EventEmitter<string>();

  centers: FitnessCenter[] = [];

  intensityColors: Record<string, string> = {
    beginner: 'green',
    intermediate: 'orange',
    advanced: 'red'
  };

  intensityLabels: Record<string, string> = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  };

  categoryLabels: Record<string, string> = {
    crossfit: 'CrossFit',
    yoga: 'Yoga',
    spinning: 'Spinning',
    pilates: 'Pilates',
    boxing: 'Boxing',
    functional: 'Funcional'
  };

  constructor(private _classStore: ClassStoreService) {
    this.centers = this._classStore.centers();
  }

  get center() {
    return this.centers.find(c => c.id === this.fitnessClass.centerId);
  }

  get availableSpots() {
    return this.fitnessClass.maxCapacity - this.fitnessClass.currentEnrollment;
  }

  get occupancyPercentage() {
    return (this.fitnessClass.currentEnrollment / this.fitnessClass.maxCapacity) * 100;
  }

  /**
   * Maneja el clic para crear el evento de reserva.
   */
  onReserveClick() {
    this.reserve.emit(this.fitnessClass.id);
  }
}
