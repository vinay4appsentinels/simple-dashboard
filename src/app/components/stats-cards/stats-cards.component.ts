import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  icon: string;
  title: string;
  value: string;
  trend: number;
  trendDirection: 'up' | 'down';
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css'
})
export class StatsCardsComponent {
  stats: StatCard[] = [
    {
      icon: 'users',
      title: 'Total Users',
      value: '1,234',
      trend: 12,
      trendDirection: 'up'
    },
    {
      icon: 'chart',
      title: 'Page Views',
      value: '45,678',
      trend: 5,
      trendDirection: 'up'
    },
    {
      icon: 'clock',
      title: 'Avg Session',
      value: '3m 42s',
      trend: 2,
      trendDirection: 'down'
    }
  ];
}
