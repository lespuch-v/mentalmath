import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../calculations.service';
import { Exercise } from '../models';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { NgFor, NgIf } from '@angular/common';
import { InputResultComponent } from '../input-result/input-result.component';
import { MathOpButtonComponent } from '../math-op-button/math-op-button.component';

@Component({
  selector: 'app-quick-math',
  standalone: true,
  imports: [
    DifficultyButtonComponent,
    NgIf,
    InputResultComponent,
    MathOpButtonComponent,
    NgFor,
  ],
  templateUrl: './quick-math.component.html',
  styleUrl: './quick-math.component.css',
})
export class QuickMathComponent implements OnInit {
  selectedDifficulty: string = 'basic';
  arithmeticOperation: string = 'addition';
  userResult!: number;
  mathProblem: Exercise | null = null;

  arithmeticOperations: string[] = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
  ];

  constructor(private calculations: CalculationsService) {}

  ngOnInit(): void {
    this.handleDifficultySelection(this.selectedDifficulty);
  }

  handleDifficultySelection(difficulty: string): void {
    this.calculations
      .generateExercise(difficulty, this.arithmeticOperation)
      .subscribe((resolve) => {
        this.mathProblem = resolve;
      });
  }

  handleMathOperation(mathOperation: string): void {
    this.arithmeticOperation = mathOperation;
  }

  handleUserResult(result: number) {
    this.userResult = result;
    console.log(this.userResult);
  }

  handleSubmit() {
    // debugger
    if (Number(this.userResult) === this.mathProblem?.answer) {
      console.log('correct');
    } else {
      console.log('wrong');
    }
  }
}
