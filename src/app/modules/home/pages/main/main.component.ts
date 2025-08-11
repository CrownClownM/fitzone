import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CenterCardComponent } from '@shared/components/center-card/center-card.component';
import { ClassCardComponent } from '@shared/components/class-card/class-card.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { ClassStoreService } from '../../services/class-store.service';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-main',
  imports: [
    MatButtonModule,
    BannerComponent,
    ClassCardComponent,
    CenterCardComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private _classStore = inject(ClassStoreService);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);

  classes = this._classStore.classes;
  centers = this._classStore.centers;

  featuredClasses = computed(() => this.classes().slice(0, 3));
  featuredCenters = computed(() => this.centers().slice(0, 2));

  /**
   * Maneja la reserva de una clase.
   * @param classId ID de la clase a reservar.
   */
  handleReserveClass(classId: string) {
    if (!this._authService.isAuthenticated()) {
      this._toastService.showInfo(
        'Debes iniciar sesión para reservar una clase.'
      );
      return;
    }

    const success = this._classStore.bookClass(classId);

    if (success) {
      this._toastService.showSuccess(
        'Tu clase ha sido reservada exitosamente.'
      );
    }
  }

  /**
   * Navega a una ruta específica.
   * @param path Ruta a la que se desea navegar.
   */
  navigateTo(path: string): void {
    this._router.navigate([path]);
  }
}
