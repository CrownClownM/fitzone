import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() text = 'Cargando...';
  @Input() icon = 'autorenew';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Input() centered = true;
}
