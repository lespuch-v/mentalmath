import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickStatService {

  private correctAnswerCount = 0;
  private highestStrike = 0;
  private totalQuestions = 0;

  incrementStrike() {
    this.correctAnswerCount++;
    if (this.correctAnswerCount > this.highestStrike) {
      this.highestStrike = this.correctAnswerCount;
    }
  }

  resetStrike() {
    this.correctAnswerCount = 0;
  }

  getCurrentStrike(): number {
    return this.correctAnswerCount;
  }

  getHighestStrike(): number {
    return this.highestStrike;
  }

  incrementTotalQuestions() {
    this.totalQuestions++;
  }

  calculateAccuracy(correctAnswers: number): number {
    return this.totalQuestions > 0 ? (correctAnswers / this.totalQuestions) * 100 : 0;
  }
}
