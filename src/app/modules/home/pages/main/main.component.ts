import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { CenterCardComponent } from "@shared/components/center-card/center-card.component";
import { ClassCardComponent } from '@shared/components/class-card/class-card.component';
import { BannerComponent } from "../../components/banner/banner.component";
import { ClassStoreService } from '../../services/class-store.service';

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, BannerComponent, ClassCardComponent, CenterCardComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private _classStore = inject(ClassStoreService);

  // Usamos directamente las señales del store para que sean reactivas
  classes = this._classStore.classes;
  centers = this._classStore.centers;

  // Computed para clases destacadas siempre tomando las primeras 3 cuando carguen
  featuredClasses = computed(() => this.classes().slice(0, 3));

  reserveClass(classId: string) {
    console.log('Reserve class:', classId);
  }
}
