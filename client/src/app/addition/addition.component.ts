import { Component, OnInit, Pipe } from '@angular/core';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { InputResultComponent } from '../input-result/input-result.component';
import { GenericButtonComponent } from '../math-op-button/generic-button.component';
import { JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
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
    FirstLetterUpperCasePipe
],
  templateUrl: './addition.component.html',
  styleUrl: './addition.component.css',
})
export class AdditionComponent implements OnInit{

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
  ]

  constructor(
    private toast: ToastService, 
    private calculationsService: CalculationsService,
    private timerService: TimerService
  ) {}

  ngOnInit() {
    this.timerService.timer$.subscribe((time) => {
      this.timerValue = time;

      if (time <= 0 && this.isExerciseRunning) {
        this.handleTimeUp();
      }
    })
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
      this.isAnswerCorrect = this.userAnswer === this.currentExercise.answer;

      // is answer correct ✅
      if (this.isAnswerCorrect) {
        this.loadExercise();
        // answer is incorrect ❌
      }else {

      }

      setTimeout(() => {
        this.isAnswerCorrect = null;
        this.userAnswer = null;
      }, 500);
    }
  }

  startExercise(): void {
    // Start with timer 
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
      })
      // Start without timer 
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
        .subscribe((exercise:Exercise) => {
          this.currentExercise = exercise;
          this.isExerciseRunning = true;
          console.log(this.currentExercise)
        });
    }else {
      console.log('Difficulty or time limit not selected.')
      this.toast.showToast({message: 'Difficulty or time limit not selected.', type: 'warning'})
    }
  }
}
