import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeResponseDTO } from '../../shared/models/theme.model';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss']
})
export class ThemeCardComponent {
  @Input() theme!: ThemeResponseDTO;
  @Output() subscriptionToggled = new EventEmitter<number>();

  onToggleSubscription(): void {
    console.log('Button clicked for ID:', this.theme.id);
    this.subscriptionToggled.emit(this.theme.id);
  }
}
