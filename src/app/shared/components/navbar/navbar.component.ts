import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, NgClass, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Clases', href: '/classes' },
    { name: 'Centros', href: '/centers' },
    { name: 'Mis Reservas', href: '/bookings', authRequired: true }
  ];

  constructor(
    public toastService: ToastService,
    private _router: Router
  ) {}

  isActivePage(path: string): boolean {
    return this._router.url === path;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(path: string): void {
    this._router.navigate([path]);
    this.isMenuOpen = false;
  }

  logout(): void {
    this._router.navigate(['/']);
  }
}
