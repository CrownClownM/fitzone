import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet, MatCardModule, MatIconModule],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.scss',
})
export class LayoutAuthComponent {}
