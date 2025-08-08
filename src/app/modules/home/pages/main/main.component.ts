import { Component, inject, signal } from '@angular/core';
import { ClassStoreService } from '../../services/class-store.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { BannerComponent } from "../../components/banner/banner.component";
import { ClassCardComponent } from '@shared/components/class-card/class-card.component';
import { FitnessCenter, FitnessClass } from '@home/interfaces/class-store.interface';
import { CenterCardComponent } from "@shared/components/center-card/center-card.component";

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, BannerComponent, BannerComponent, ClassCardComponent, CenterCardComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  private classStore = inject(ClassStoreService);

  classes: FitnessClass[] = this.classStore.classes();
  centers: FitnessCenter[] = this.classStore.centers();

  featuredClasses = signal(this.classes.slice(0, 3));

  reserveClass(classId: string) {
    console.log('Reserve class:', classId);
  }
}
