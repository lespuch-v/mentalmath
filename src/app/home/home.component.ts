import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type TechniqueId = 11 | 12 | 5;

interface MultiplicationExample {
  number: number;
  multiplier: TechniqueId;
  steps: {
    description: string;
    calculation: string;
    result: string;
  }[];
  finalResult: number;
}

interface TechniqueDescription {
  id: TechniqueId;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  openSection: string = 'intro';
  selectedTechnique: TechniqueId = 11;
  currentStep: number = 1;
  showFinalResult: boolean = false;
  currentExample: MultiplicationExample | null = null;

  readonly techniques: TechniqueDescription[] = [
    { id: 11, description: "Multiply any number by 11 using simple addition of adjacent digits." },
    { id: 12, description: "Multiply by 12 using a combination of ×10 and ×2." },
    { id: 5, description: "Multiply by 5 by dividing by 2 and multiplying by 10." }
  ];

  readonly examplesByTechnique: Record<TechniqueId, MultiplicationExample[]> = {
    11: [
      {
        number: 24,
        multiplier: 11,
        steps: [
          {
            description: "Start with rightmost digit",
            calculation: "4 becomes the rightmost digit",
            result: "4"
          },
          {
            description: "Add adjacent digits",
            calculation: "4 + 2 = 6",
            result: "64"
          },
          {
            description: "Add leftmost digit",
            calculation: "2 becomes the leftmost digit",
            result: "264"
          }
        ],
        finalResult: 264
      }
    ],
    12: [
      {
        number: 25,
        multiplier: 12,
        steps: [
          {
            description: "Multiply by 10",
            calculation: "25 × 10 = 250",
            result: "250"
          },
          {
            description: "Multiply by 2",
            calculation: "25 × 2 = 50",
            result: "250 + 50"
          },
          {
            description: "Add results",
            calculation: "250 + 50 = 300",
            result: "300"
          }
        ],
        finalResult: 300
      }
    ],
    5: [
      {
        number: 26,
        multiplier: 5,
        steps: [
          {
            description: "Divide by 2",
            calculation: "26 ÷ 2 = 13",
            result: "13"
          },
          {
            description: "Multiply by 10",
            calculation: "13 × 10 = 130",
            result: "130"
          }
        ],
        finalResult: 130
      }
    ]
  };

  constructor() {
    this.selectTechnique(11);
  }

  toggleSection(section: string): void {
    this.openSection = this.openSection === section ? '' : section;
  }

  selectTechnique(technique: TechniqueId): void {
    this.selectedTechnique = technique;
    this.currentStep = 1;
    this.showFinalResult = false;
    this.generateNewExample();
  }

  getCurrentTechniqueDescription(): string {
    const technique = this.techniques.find(t => t.id === this.selectedTechnique);
    return technique?.description || '';
  }

  generateNewExample(): void {
    const examples = this.examplesByTechnique[this.selectedTechnique] || [];
    if (examples.length > 0) {
      const randomIndex = Math.floor(Math.random() * examples.length);
      this.currentExample = examples[randomIndex];
      this.currentStep = 1;
      this.showFinalResult = false;
    }
  }
}
