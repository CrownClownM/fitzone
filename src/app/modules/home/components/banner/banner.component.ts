import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [MatButtonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  bannerImage = 'assets/images/hero-fitness.webp';

  private _router = inject(Router);

  /**
   * Navega a una ruta específica.
   * @param path Ruta a la que se desea navegar.
   */
  navigateTo(path: string): void {
    this._router.navigate([path]);
  }
}
