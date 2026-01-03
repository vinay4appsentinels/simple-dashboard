import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer';
import { HeaderComponent } from './components/header/header.component';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, StatsCardsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Simple Dashboard';
}
