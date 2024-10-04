import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuickStatService {

  private correctAnswerCount = 0;
  private highestStrike = 0;
  private totalQuestions = 0;
  private totalChallengesSolved = 0;

  private highestStrikeSubject = new BehaviorSubject<number>(0);
  highestStrike$ = this.highestStrikeSubject.asObservable();

  private accuracyRateSubject = new BehaviorSubject<number>(0);
  accuracyRate$ = this.accuracyRateSubject.asObservable();

  private totalChallengesSolvedSubject = new BehaviorSubject<number>(0);
  totalChallengesSolved$ = this.totalChallengesSolvedSubject.asObservable();

  incrementStrike() {
    this.correctAnswerCount++;
    if (this.correctAnswerCount > this.highestStrike) {
      this.highestStrike = this.correctAnswerCount;
      this.highestStrikeSubject.next(this.highestStrike);
    }
  }

  resetStrike() {
    this.correctAnswerCount = 0;
  }

  getCurrentStrike(): number {
    return this.correctAnswerCount;
  }

  incrementTotalQuestions(): void {
    this.totalQuestions++;
  }

  incrementSolvedChallenges() {
    this.totalChallengesSolved++;
    this.totalChallengesSolvedSubject.next(this.totalChallengesSolved);
  }

  calculateAccuracy(correctAnswers: number): void {
    const accuracy = this.totalQuestions > 0 ? (correctAnswers / this.totalQuestions) * 100 : 0;
    this.accuracyRateSubject.next(accuracy);
  }
}
