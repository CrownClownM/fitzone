import { Component, inject } from '@angular/core';
import { ClassStoreService } from '@home/services/class-store.service';
import { CenterCardComponent } from '@shared/components/center-card/center-card.component';

@Component({
  selector: 'app-centers',
  imports: [CenterCardComponent],
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.scss',
})
export class CentersComponent {

  private _classStore = inject(ClassStoreService);

  centers = this._classStore.centers;

}
