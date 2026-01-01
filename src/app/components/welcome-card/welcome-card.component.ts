import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css'
})
export class WelcomeCardComponent {
  @Input() userName: string = 'User';
  @Input() message: string = 'Welcome to the Simple Dashboard!';

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }
}
