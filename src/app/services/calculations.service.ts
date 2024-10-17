import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  // Constructor for the service.
  // Currently, no dependencies are injected, but it can be extended in the future if needed.
  constructor() { }

  /**
   * Generates an arithmetic exercise based on the given difficulty and operation type.
   * @param difficulty - The difficulty level of the exercise ('super easy', 'basic', 'easy', 'medium', 'hard', or 'mix').
   * @param operationType - The type of arithmetic operation ('addition', 'subtraction', 'multiplication', 'division', or 'mix').
   * @returns An Observable of an Exercise object containing the question, answer, type, and difficulty.
   * @throws Will throw an error if an invalid operation type or difficulty is provided.
   */
  generateExercise(difficulty: string, operationType: string): Observable<Exercise> {
    // Handle 'mix' difficulty by randomly selecting a difficulty level
    if (difficulty === 'mix') {
      const difficulties = ['super easy', 'basic', 'easy', 'medium', 'hard'];
      difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    }

    // Handle 'mix' operationType by randomly selecting an operation
    if (operationType === 'mix') {
      const operationTypes = ['addition', 'subtraction', 'multiplication', 'division'];
      operationType = operationTypes[Math.floor(Math.random() * operationTypes.length)];
    }

    const { num1, num2 } = this.getNumbersByDifficulty(difficulty);
    let exercise: Exercise;

    switch (operationType) {
      case 'addition':
        exercise = this.createAdditionExercise(num1, num2, difficulty);
        break;
      case 'subtraction':
        exercise = this.createSubtractionExercise(num1, num2, difficulty);
        break;
      case 'multiplication':
        exercise = this.createMultiplicationExercise(num1, num2, difficulty);
        break;
      case 'division':
        exercise = this.createDivisionExercise(num1, num2, difficulty);
        break;
      default:
        throw new Error('Invalid operation type...');
    }

    return of(exercise);
  }

  /**
   * Determines appropriate numbers for an arithmetic exercise based on the difficulty level.
   * @param difficulty - The difficulty level ('super easy', 'basic', 'easy', 'medium', 'hard').
   * @returns An object containing two randomly generated numbers (`num1` and `num2`).
   * @throws Will throw an error if an invalid difficulty level is provided.
   */
  private getNumbersByDifficulty(difficulty: string): { num1: number; num2: number } {
    let min: number;
    let max: number;

    switch (difficulty) {
      case 'basic':
        min = 1;
        max = 5;
        break;
      case 'easy':
        min = 1;
        max = 10;
        break;
      case 'intermediate':
        min = 11;
        max = 99;
        break;
      case 'medium':
        min = 100;
        max = 999;
        break;
      case 'challenging':
        min = 1000;
        max = 9999;
        break;
      case 'hard':
        min = 10000;
        max = 99999;
        break;
      case 'expert':
        min = 100000;
        max = 999999;
        break;
      default:
        throw new Error('Invalid difficulty level...');
    }

    const num1 = this.getRandomInt(min, max);
    const num2 = this.getRandomInt(min, max);

    return { num1, num2 };
  }


  /**
   * Generates a random integer between `min` and `max` (inclusive).
   * @param min - The minimum possible value.
   * @param max - The maximum possible value.
   * @returns A random integer between `min` and `max`.
   */
  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Creates an addition exercise.
   * @param num1 - The first number.
   * @param num2 - The second number.
   * @param difficulty - The difficulty level of the exercise.
   * @returns An Exercise object for addition.
   */
  private createAdditionExercise(num1: number, num2: number, difficulty: string): Exercise {
    return {
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
      type: 'addition',
      difficulty,
    };
  }

  /**
   * Creates a subtraction exercise, ensuring the result is non-negative.
   * @param num1 - The first number.
   * @param num2 - The second number.
   * @param difficulty - The difficulty level of the exercise.
   * @returns An Exercise object for subtraction.
   */
  private createSubtractionExercise(num1: number, num2: number, difficulty: string): Exercise {
    const [larger, smaller] = num1 >= num2 ? [num1, num2] : [num2, num1];
    return {
      question: `${larger} - ${smaller}`,
      answer: larger - smaller,
      type: 'subtraction',
      difficulty,
    };
  }

  /**
   * Creates a multiplication exercise.
   * @param num1 - The first number.
   * @param num2 - The second number.
   * @param difficulty - The difficulty level of the exercise.
   * @returns An Exercise object for multiplication.
   */
  private createMultiplicationExercise(num1: number, num2: number, difficulty: string): Exercise {
    return {
      question: `${num1} × ${num2}`,
      answer: num1 * num2,
      type: 'multiplication',
      difficulty,
    };
  }

  /**
   * Creates a division exercise where the division results in an integer.
   * @param num1 - The first number.
   * @param num2 - The second number.
   * @param difficulty - The difficulty level of the exercise.
   * @returns An Exercise object for division.
   */
  private createDivisionExercise(num1: number, num2: number, difficulty: string): Exercise {
    const product = num1 * num2;
    return {
      question: `${product} ÷ ${num1}`,
      answer: num2,
      type: 'division',
      difficulty,
    };
  }
}
