import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgClass,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMenuOpen = false;

  navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Centros', href: '/centers' },
    { name: 'Clases', href: '/classes' },
    { name: 'Mis Reservas', href: '/bookings', authRequired: true },
  ];

  private _router = inject(Router);
  private _authService = inject(AuthService);

  isLoggedIn = computed(() => this._authService.isAuthenticated());
  user = computed(() => this._authService.user());

  isActivePage(path: string): boolean {
    return this._router.url === path;
  }

  /**
   * Maneja el toggle del menú de navegación.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Navega a la ruta especificada.
   * @param path Ruta a la que navegar.
   */
  navigateTo(path: string): void {
    this._router.navigate([path]);
    this.isMenuOpen = false;
  }

  /**
   * Cierra sesión y navega a la página de inicio.
   */
  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
