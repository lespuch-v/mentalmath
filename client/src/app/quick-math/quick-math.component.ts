import { Component, OnInit, signal } from '@angular/core';
import { Exercise } from '../models';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { InputResultComponent } from '../input-result/input-result.component';
import { MathOpButtonComponent } from '../math-op-button/math-op-button.component';
import { QuickStatAccuracyRateComponent } from "../quick-stat-accuracy-rate/quick-stat-accuracy-rate.component";
import { QuickStatCurrentStrikeComponent } from "../quick-stat-current-strike/quick-stat-current-strike.component";
import { QuickStatHighestStrikeComponent } from "../quick-stat-highest-strike/quick-stat-highest-strike.component";
import { CalculationsService } from '../services/calculations.service';
import { QuickStatService } from '../services/quick-stat.service';

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
    QuickStatAccuracyRateComponent,
    QuickStatCurrentStrikeComponent,
    QuickStatHighestStrikeComponent
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
  isAnswerCorrect: boolean | null = null;
  correctAnswerCount: number = 0;

  // List of all available arithmetic operations
  mathOperations: string[] = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
  ];

  difficulties: string[] = [
    'basic', 'easy', 'medium', 'hard', 'mix'
  ]

  // Inject the calculations service to generate exercises
  constructor(private calculationsService: CalculationsService, private quickStatService: QuickStatService) {}

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
      this.isAnswerCorrect = this.userAnswer === this.currentExercise.answer;

      if (this.isAnswerCorrect) {
        this.correctAnswerCount++;
        this.quickStatService.incrementStrike();
        this.quickStatService.incrementTotalQuestions();
        this.quickStatService.calculateAccuracy(this.correctAnswerCount);
        this.loadExercise();
      } else {
        this.correctAnswerCount = 0;
        this.quickStatService.resetStrike();
        this.quickStatService.incrementTotalQuestions();
        this.quickStatService.calculateAccuracy(this.correctAnswerCount);
      }

      setTimeout(() => {
        this.isAnswerCorrect = null;
        this.userAnswer = null;
      }, 500);
    }
  }

  onKeyEnter(event: KeyboardEvent): void{
    if (event.key == 'Enter'){
      this.onSubmit();
      this.isAnswerCorrect = this.handleCorrectAnswer();
    }
  }

  trackByDifficulty(index: number, item: string): string {
    return item;
  }

  handleCorrectAnswer(): boolean {
    const exercise = this.currentExercise

    if (exercise) {
      if(this.userAnswer === exercise.answer){
        this.userAnswer === exercise.answer;
        return true;
      }
    }
    return false;
  }
}
