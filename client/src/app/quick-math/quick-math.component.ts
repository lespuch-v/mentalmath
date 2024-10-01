import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../calculations.service';
import { Exercise } from '../models';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
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
    JsonPipe,
  ],
  templateUrl: './quick-math.component.html',
  styleUrls: ['./quick-math.component.css'],
})
export class QuickMathComponent implements OnInit {
  // Variables to hold the current difficulty level and selected operation
  selectedDifficulty: string = 'basic';
  selectedOperation: string = 'addition';
  userAnswer: number | null = null; // Holds the user's answer input
  currentExercise: Exercise | null = null; // Holds the current math problem

  // List of all available arithmetic operations
  mathOperations: string[] = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
  ];

  // Inject the calculations service to generate exercises
  constructor(private calculationsService: CalculationsService) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Load an exercise when the component starts
    this.loadExercise();
  }

  // Method to load a math exercise based on the selected difficulty and operation
  loadExercise(): void {
    this.calculationsService
      .generateExercise(this.selectedDifficulty, this.selectedOperation)
      .subscribe((exercise) => {
        // Assign the generated exercise to the currentExercise variable
        this.currentExercise = exercise;
      });
  }

  // Method to change the difficulty level and load a new exercise
  onDifficultyChange(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.loadExercise();
  }

  // Method to change the selected arithmetic operation and load a new exercise
  onOperationChange(operation: string): void {
    this.selectedOperation = operation;
    this.loadExercise();
  }

  // Method to capture the user's answer from the input-result component
  onUserAnswerChange(answer: number): void {
    this.userAnswer = answer;
  }

  // Method to handle submission of the user's answer
  onSubmit(): void {
    if (this.currentExercise !== null && this.userAnswer !== null) {
      if (this.userAnswer === this.currentExercise.answer) {
        console.log('Correct!'); // Print "Correct!" if the user's answer is correct
      } else {
        console.log('Incorrect. Try again.'); // Print a message if the user's answer is incorrect
      }
    }
  }
}
