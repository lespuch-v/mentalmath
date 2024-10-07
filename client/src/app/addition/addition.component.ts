import { Component } from '@angular/core';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { InputResultComponent } from '../input-result/input-result.component';
import { GenericButtonComponent } from '../math-op-button/generic-button.component';
import { NgForOf, NgIf } from '@angular/common';
import { QuickStatAccuracyRateComponent } from '../quick-stat-accuracy-rate/quick-stat-accuracy-rate.component';
import { QuickStatCurrentStrikeComponent } from '../quick-stat-current-strike/quick-stat-current-strike.component';
import { QuickStatHighestStrikeComponent } from '../quick-stat-highest-strike/quick-stat-highest-strike.component';
import { QuickStatTotalSolvedComponent } from '../quick-stat-total-solved/quick-stat-total-solved.component';
import { Exercise } from '../models';

@Component({
  selector: 'app-addition',
  standalone: true,
  imports: [
    DifficultyButtonComponent,
    InputResultComponent,
    GenericButtonComponent,
    NgForOf,
    NgIf,
    QuickStatAccuracyRateComponent,
    QuickStatCurrentStrikeComponent,
    QuickStatHighestStrikeComponent,
    QuickStatTotalSolvedComponent
  ],
  templateUrl: './addition.component.html',
  styleUrl: './addition.component.css'
})
export class AdditionComponent {
  currentExercise: Exercise | null = null;
  difficulties: string[] = [
    'basic', 'easy', 'medium', 'hard', 'mix'
  ]

  onUserAnswerChange($event: number) {

  }

  onSubmit() {

  }

  trackByDifficulty(index: number, item: string): string {
    return item;
  }

  onDifficultyChange(difficulty: string): void {
    // this.selectedDifficulty = difficulty;
    // this.loadExercise();
  }
}
