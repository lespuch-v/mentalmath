import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface PointSystemState {
  points: number;
  streak: number;
  currentLevel: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalAnswers: number;
  highestStreak: number;
  lastPoints: number;
}

@Injectable({
  providedIn: 'root'
})
export class PointSystemService {
  private initialState: PointSystemState = {
    points: 0,
    streak: 0,
    currentLevel: 1,
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalAnswers: 0,
    highestStreak: 0,
    lastPoints: 0
  };

  private state = new BehaviorSubject<PointSystemState>(this.initialState);
  points$ = this.state.asObservable();

  calculatePoints(
    difficulty: string,
    timeLimit: string,
    responseTime: number,
    isCorrect: boolean
  ): number {
    const currentState = this.state.value;
    let points = 0;

    if (isCorrect) {
      // Calculate base points based on difficulty
      points = this.calculateBasePoints(difficulty);

      // Apply time limit bonus
      points = this.applyTimeLimitBonus(points, timeLimit);

      // Apply response time bonus
      points = this.applyResponseTimeBonus(points, responseTime);

      // Apply streak bonus
      const streakMultiplier = 1 + (currentState.streak * 0.1);
      points = Math.round(points * streakMultiplier);

      // Update state with correct answer
      const newState = {
        ...currentState,
        points: currentState.points + points,
        streak: currentState.streak + 1,
        highestStreak: Math.max(currentState.streak + 1, currentState.highestStreak),
        currentLevel: this.calculateLevel(currentState.points + points),
        correctAnswers: currentState.correctAnswers + 1,
        totalAnswers: currentState.totalAnswers + 1,
        lastPoints: points
      };

      this.state.next(newState);
    } else {
      // Update state with incorrect answer
      const newState = {
        ...currentState,
        streak: 0,
        incorrectAnswers: currentState.incorrectAnswers + 1,
        totalAnswers: currentState.totalAnswers + 1,
        lastPoints: 0
      };

      this.state.next(newState);
    }

    return points;
  }

  private calculateBasePoints(difficulty: string): number {
    const difficultyPoints: { [key: string]: number } = {
      'easy': 100,
      'intermediate': 200,
      'medium': 300,
      'challenging': 400,
      'hard': 500,
      'expert': 600,
      'mix': 350
    };

    return difficultyPoints[difficulty] || 100;
  }

  private applyTimeLimitBonus(points: number, timeLimit: string): number {
    const timeLimitMultipliers: { [key: string]: number } = {
      '1min': 1.5,
      '5min': 1.2,
      '10min': 1.1,
      '30min': 1.0,
      'noTimeLimit': 0.8
    };

    return Math.round(points * (timeLimitMultipliers[timeLimit] || 1));
  }

  private applyResponseTimeBonus(points: number, responseTime: number): number {
    let timeMultiplier = 1;

    if (responseTime < 2) {
      timeMultiplier = 1.5;  // Super fast response
    } else if (responseTime < 5) {
      timeMultiplier = 1.3;  // Fast response
    } else if (responseTime < 10) {
      timeMultiplier = 1.1;  // Quick response
    } else if (responseTime > 30) {
      timeMultiplier = 0.8;  // Slow response
    }

    return Math.round(points * timeMultiplier);
  }

  private calculateLevel(points: number): number {
    return Math.floor(points / 1000) + 1;
  }

  getLevelProgress() {
    const currentPoints = this.state.value.points;
    const currentLevel = this.calculateLevel(currentPoints);
    const pointsInCurrentLevel = currentPoints - ((currentLevel - 1) * 1000);
    return {
      current: pointsInCurrentLevel,
      required: 1000
    };
  }

  getAnswerStatistics() {
    const {
      correctAnswers,
      incorrectAnswers,
      totalAnswers,
      streak,
      highestStreak,
      points,
      currentLevel
    } = this.state.value;

    return {
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      total: totalAnswers,
      accuracy: totalAnswers > 0 ? (correctAnswers / totalAnswers * 100) : 0,
      currentStreak: streak,
      highestStreak: highestStreak,
      averagePoints: totalAnswers > 0 ? (points / correctAnswers) : 0,
      level: currentLevel
    };
  }

  getCurrentStreak(): number {
    return this.state.value.streak;
  }

  getHighestStreak(): number {
    return this.state.value.highestStreak;
  }

  getCurrentLevel(): number {
    return this.state.value.currentLevel;
  }

  getTotalPoints(): number {
    return this.state.value.points;
  }

  getLastPoints(): number {
    return this.state.value.lastPoints;
  }

  resetProgress(): void {
    this.state.next(this.initialState);
  }

  // Save state to localStorage
  saveState(): void {
    localStorage.setItem('mathGameState', JSON.stringify(this.state.value));
  }

  // Load state from localStorage
  loadState(): void {
    const savedState = localStorage.getItem('mathGameState');
    if (savedState) {
      this.state.next(JSON.parse(savedState));
    }
  }
}
