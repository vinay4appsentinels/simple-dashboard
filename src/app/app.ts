import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Simple Dashboard';
}
