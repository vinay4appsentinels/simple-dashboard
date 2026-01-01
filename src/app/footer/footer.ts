import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  currentYear = 2026;
  appName = 'Simple Dashboard';
  githubUrl = 'https://github.com/vinay4appsentinels/simple-dashboard';
}
