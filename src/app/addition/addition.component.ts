import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { InputResultComponent } from '../input-result/input-result.component';
import { GenericButtonComponent } from '../math-op-button/generic-button.component';
import { DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { QuickStatAccuracyRateComponent } from '../quick-stat-accuracy-rate/quick-stat-accuracy-rate.component';
import { QuickStatCurrentStrikeComponent } from '../quick-stat-current-strike/quick-stat-current-strike.component';
import { QuickStatHighestStrikeComponent } from '../quick-stat-highest-strike/quick-stat-highest-strike.component';
import { QuickStatTotalSolvedComponent } from '../quick-stat-total-solved/quick-stat-total-solved.component';
import { Exercise } from '../models';
import { ToastService } from '../services/toast.service';
import { MyChartComponent } from "../my-chart/my-chart.component";
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from '../radar-chart/radar-chart.component';
import { SolvedProblemsComponent } from "../solved-problems/solved-problems.component";
import { CalculationsService } from '../services/calculations.service';
import { TimerService } from '../timer.service';
import { Subscription } from 'rxjs';
import { FirstLetterUpperCasePipe } from "../utils/first-letter-upper-case.pipe";
import { PointSystemService } from '../point-system.service';

@Component({
  selector: 'app-addition',
  standalone: true,
  imports: [
    DifficultyButtonComponent,
    InputResultComponent,
    GenericButtonComponent,
    NgForOf,
    NgIf,
    NgClass,
    QuickStatAccuracyRateComponent,
    QuickStatCurrentStrikeComponent,
    QuickStatHighestStrikeComponent,
    QuickStatTotalSolvedComponent,
    MyChartComponent,
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    SolvedProblemsComponent,
    JsonPipe,
    FirstLetterUpperCasePipe,
    DecimalPipe
  ],
  templateUrl: './addition.component.html',
  styleUrl: './addition.component.css',
})
export class AdditionComponent implements OnInit, OnDestroy {

  selectedDifficulty: string = '';
  isExerciseRunning: boolean = false;
  selectedLimit: string = '';
  currentExercise: Exercise | null = null;
  userAnswer: number | null = null;
  isAnswerCorrect: boolean | null = null;
  timerValue: number = 0;
  private timeSubscription?: Subscription;

  customDatasets: { label: string, data: number[] }[] = [
    {
      label: 'Dataset 1',
      data: [15, 25, 35, 45, 55]
    }
  ];

  difficulties: { difficulty: string; tooltip: string }[] = [
    { difficulty: 'easy', tooltip: '0-10' },
    { difficulty: 'intermediate', tooltip: '10-99'},
    { difficulty: 'medium', tooltip: '100-999'},
    { difficulty: 'challenging', tooltip: '1000-9999'},
    { difficulty: 'hard', tooltip: '10000-99999'},
    { difficulty: 'expert', tooltip: '100000-999999'},
    { difficulty: 'mix', tooltip: '?'}
  ];

  statistics = {
    correct: 0,
    incorrect: 0,
    accuracy: 0,
    averagePoints: 0
  };

  questionStartTime: number = 0;
  currentPoints: number = 0;
  currentStreak: number = 0;
  currentLevel: number = 1;
  levelProgress: { current: number, required: number } = { current: 0, required: 1000 };

  constructor(
    private toast: ToastService,
    private calculationsService: CalculationsService,
    private timerService: TimerService,
    private pointSystem: PointSystemService
  ) {}

  ngOnInit() {
    // Existing timer subscription
    this.timerService.timer$.subscribe((time) => {
      this.timerValue = time;
      if (time <= 0 && this.isExerciseRunning) {
        this.handleTimeUp();
      }
    });

    // Add point system subscription
    this.pointSystem.points$.subscribe(state => {
      this.currentStreak = state.streak;
      this.currentLevel = state.currentLevel;
      this.levelProgress = this.pointSystem.getLevelProgress();
    });

    this.pointSystem.points$.subscribe(() => {
      const stats = this.pointSystem.getAnswerStatistics();
      this.statistics = {
        correct: stats.correct,
        incorrect: stats.incorrect,
        accuracy: stats.accuracy,
        averagePoints: stats.averagePoints
      };
    });
  }

  handleTimeUp(): void {
    this.isExerciseRunning = false;
    this.toast.showToast({ message: 'Time is up!', type: 'info'})
  }

  onUserAnswerChange(answer: number): void {
    this.userAnswer = answer;
  }

  onSubmit() {
    if (this.currentExercise !== null && this.userAnswer !== null) {
      const isCorrect = this.userAnswer === this.currentExercise.answer;

      // Calculate response time in seconds
      const responseTime = (Date.now() - this.questionStartTime) / 1000;

      // Calculate points
      const points = this.pointSystem.calculatePoints(
        this.selectedDifficulty,
        this.selectedLimit,
        responseTime,
        isCorrect
      );

      // Show points toast if correct
      if (points > 0) {
        this.toast.showToast({
          message: `+${points} points! ${responseTime.toFixed(1)}s`,
          type: 'success'
        });
      } else if (!isCorrect) {
        this.toast.showToast({
          message: 'Incorrect! Streak reset',
          type: 'error'
        });
      }

      this.isAnswerCorrect = isCorrect;

      if (isCorrect) {
        this.loadExercise();
      }

      setTimeout(() => {
        this.isAnswerCorrect = null;
        this.userAnswer = null;
      }, 500);
    }
  }

  startExercise(): void {
    // Reset points for new session
    this.pointSystem.resetProgress();

    if (this.selectedDifficulty && this.selectedLimit) {
      this.isExerciseRunning = true;
      this.loadExercise();

      const timeLimits: { [key: string]: number } = {
        '1min': 60,
        '5min': 300,
        '10min': 600,
        'noTimeLimit': Infinity,
      };

      const selectedTime = timeLimits[this.selectedLimit];

      if (selectedTime !== Infinity) {
        this.timerService.startTimer(selectedTime);
      }

      if (this.timeSubscription) {
        this.timeSubscription.unsubscribe();
      }

      this.timeSubscription = this.timerService.timer$.subscribe(time => {
        this.timerValue = time;
        if (selectedTime === Infinity) {
          this.timerValue = 0;
        }
      });
    } else {
      this.toast.showToast({
        message: 'Difficulty or time limit not selected.',
        type: 'warning',
      });
      this.timerService.resetTimer();
      this.timerValue = 0;
    }
  }

  stopTimer(): void {
    this.isExerciseRunning = false;
    this.timerService.stopTimer();
  }


  handleDifficultySelection(difficulty: string): void {
    this.selectedDifficulty = difficulty;
  }

  handleSelectLimit(limit: string): void {
    this.selectedLimit = limit
  }

  loadExercise(): void {
    if (this.selectedDifficulty && this.selectedLimit) {
      this.calculationsService.generateExercise(this.selectedDifficulty, 'addition')
        .subscribe((exercise: Exercise) => {
          this.currentExercise = exercise;
          this.isExerciseRunning = true;
          // Record the start time when loading a new exercise
          this.questionStartTime = Date.now();
        });
    } else {
      this.toast.showToast({message: 'Difficulty or time limit not selected.', type: 'warning'})
    }
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}
