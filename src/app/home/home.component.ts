import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  openSection: string = 'intro';
  showExample: boolean = false;

  examples = [
    {
      num1: 12,
      num2: 11,
      steps: [
        "Start from right: 2 × 1 = 2",
        "Middle: (2 × 1) + (1 × 1) = 3",
        "Left: 1 × 1 = 1",
        "Result: 132"
      ]
    }
  ];

  // Progress tracking (you might want to connect this to a service later)
  progress = {
    mult11: 60,
    mult12: 40,
    advanced: 25,
    totalSolved: 89,
    accuracy: 85,
    averageTime: 12
  };

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? '' : section;
  }

  toggleExample(): void {
    this.showExample = !this.showExample;
  }

  startPractice(type: string): void {
    // You can implement the navigation to different practice sections here
    console.log(`Starting practice for: ${type}`);
    // Example: this.router.navigate(['/practice', type]);
  }
}
