import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface PointsState {
  currentPoints: number;
  streak: number;
  multiplier: number;
  totalPoints: number;
  levelProgress: number;
  currentLevel: number;
}

@Injectable({
  providedIn: 'root'
})
export class PointSystemService {
  // Difficulty multipliers
  private readonly DIFFICULTY_MULTIPLIERS = {
    'easy': 1,
    'intermediate': 2,
    'medium': 3,
    'challenging': 4,
    'hard': 5,
    'expert': 6,
    'mix': 3.5
  };

  // Time-based bonus multipliers
  private readonly TIME_MULTIPLIERS = {
    '1min': 1.5,  // Higher pressure, higher reward
    '5min': 1.3,
    '10min': 1.2,
    'noTimeLimit': 1.0
  };

  // Speed bonus thresholds (in seconds)
  private readonly SPEED_BONUS = {
    SUPER_FAST: { threshold: 3, multiplier: 2.0 },
    FAST: { threshold: 5, multiplier: 1.5 },
    NORMAL: { threshold: 10, multiplier: 1.0 }
  };

  // Level thresholds
  private readonly POINTS_PER_LEVEL = 1000;
  private readonly MAX_LEVEL = 100;

  private state = new BehaviorSubject<PointsState>({
    currentPoints: 0,
    streak: 0,
    multiplier: 1,
    totalPoints: 0,
    levelProgress: 0,
    currentLevel: 1
  });

  points$ = this.state.asObservable();

  constructor() { }

  calculatePoints(
    difficulty: string,
    timeLimit: string,
    responseTime: number,
    isCorrect: boolean
  ): number {
    if (!isCorrect) {
      this.resetStreak();
      return 0;
    }

    // Base points calculation
    let points = 100;

    // Apply difficulty multiplier
    points *= this.DIFFICULTY_MULTIPLIERS[difficulty as keyof typeof this.DIFFICULTY_MULTIPLIERS];

    // Apply time limit multiplier
    points *= this.TIME_MULTIPLIERS[timeLimit as keyof typeof this.TIME_MULTIPLIERS];

    // Apply speed bonus
    if (responseTime <= this.SPEED_BONUS.SUPER_FAST.threshold) {
      points *= this.SPEED_BONUS.SUPER_FAST.multiplier;
    } else if (responseTime <= this.SPEED_BONUS.FAST.threshold) {
      points *= this.SPEED_BONUS.FAST.multiplier;
    }

    // Apply streak bonus
    const currentState = this.state.value;
    currentState.streak++;
    const streakMultiplier = Math.min(1 + (currentState.streak * 0.1), 2.0);
    points *= streakMultiplier;

    // Round points to nearest integer
    points = Math.round(points);

    this.updatePoints(points);
    return points;
  }

  private updatePoints(points: number) {
    const currentState = this.state.value;

    // Update total points
    currentState.totalPoints += points;

    // Update level progress
    currentState.levelProgress += points;

    // Check for level up
    while (currentState.levelProgress >= this.POINTS_PER_LEVEL && currentState.currentLevel < this.MAX_LEVEL) {
      currentState.levelProgress -= this.POINTS_PER_LEVEL;
      currentState.currentLevel++;
    }

    this.state.next({ ...currentState });
  }

  private resetStreak() {
    const currentState = this.state.value;
    currentState.streak = 0;
    this.state.next({ ...currentState });
  }

  getLevelProgress(): { current: number, required: number } {
    const { levelProgress } = this.state.value;
    return {
      current: levelProgress,
      required: this.POINTS_PER_LEVEL
    };
  }

  getCurrentLevel(): number {
    return this.state.value.currentLevel;
  }

  getTotalPoints(): number {
    return this.state.value.totalPoints;
  }

  getCurrentStreak(): number {
    return this.state.value.streak;
  }

  resetProgress(): void {
    this.state.next({
      currentPoints: 0,
      streak: 0,
      multiplier: 1,
      totalPoints: 0,
      levelProgress: 0,
      currentLevel: 1
    });
  }

}
