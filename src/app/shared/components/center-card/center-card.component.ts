import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

export interface Center {
  id: number | string;
  name: string;
  address: string;
  city: string;
  image: string;
  facilities: string[];
}

@Component({
  selector: 'app-center-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './center-card.component.html',
  styleUrls: ['./center-card.component.scss']
})
export class CenterCardComponent {
  @Input() center!: Center;
}
