import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new BehaviorSubject<number>(0);
  private timerSubscription?: Subscription;
  private remainingTime = 0;
  private isPaused = false;

  timer$ = this.timerSubject.asObservable();

  startTimer(durationInSeconds: number) {
    this.stopTimer();
    this.remainingTime = durationInSeconds;
    this.timerSubject.next(this.remainingTime);

    this.timerSubscription = interval(1000).subscribe(() => {
      this.remainingTime--;
      this.timerSubject.next(this.remainingTime);

      if (this.remainingTime <= 0) {
        this.stopTimer();
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.stopTimer();
    this.remainingTime = 0;
    this.timerSubject.next(this.remainingTime);
  }

  pauseTimer() {
    if (this.timerSubscription && !this.isPaused) {
      this.isPaused = true;
    }
  }

  resumeTimer() {
    if(this.timerSubscription && this.isPaused) {
      this.isPaused = false;
    }
  }
}
