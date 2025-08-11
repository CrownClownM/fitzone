import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FitnessCenter } from '@home/interfaces/class-store.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './center-card.component.html',
  styleUrls: ['./center-card.component.scss'],
})
export class CenterCardComponent {
  @Input() center!: FitnessCenter;

  private _router = inject(Router);

  /**
   * Navega a la vista de clases aplicando el centro como query param
   */
  navigateToClasses(): void {
    if (!this.center) return;
    this._router.navigate(['/classes'], {
      queryParams: { centerId: this.center.id },
    });
  }
}
