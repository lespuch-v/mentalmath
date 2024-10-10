import { Component } from '@angular/core';
import { DifficultyButtonComponent } from '../difficulty-button/difficulty-button.component';
import { InputResultComponent } from '../input-result/input-result.component';
import { GenericButtonComponent } from '../math-op-button/generic-button.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
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
    RadarChartComponent
  ],
  templateUrl: './addition.component.html',
  styleUrl: './addition.component.css',
})
export class AdditionComponent {

  selectedDifficulty: string = '';
  isExerciseRunning: boolean = false;
  selectedLimit: string = '';
  currentExercise: Exercise | null = {
    question: '1+1', difficulty: 'hard', type:'addition', answer:1
  };

  customDatasets: { label: string, data: number[] }[] = [
    {
      label: 'Dataset 1',
      data: [15, 25, 35, 45, 55]
    }
  ];

  imageHexagon: string = './assets/images/winCoin.png'

  timer: any;
  time: number = 0;

  difficulties: { difficulty: string; tooltip: string }[] = [
    { difficulty: 'easy', tooltip: '0-10' },
    { difficulty: 'intermediate', tooltip: '10-99'},
    { difficulty: 'medium', tooltip: '100-999'},
    { difficulty: 'challenging', tooltip: '1000-9999'},
    { difficulty: 'hard', tooltip: '10000-99999'},
    { difficulty: 'expert', tooltip: '100000-999999'},
    { difficulty: 'mix', tooltip: '?'}
  ]

  constructor(private toast: ToastService) {

  }

  onUserAnswerChange($event: number) {}

  onSubmit() {

  }

  trackByDifficulty(index: number, item: string): string {
    return item;
  }

  handleDifficultySelection(difficulty: string): void {

    this.selectedDifficulty = difficulty;
  }

  handleSelectLimit($event: string): void {
    this.selectedLimit = $event
  }

  startExercise(): void {
    if(this.selectedDifficulty && this.selectedLimit){
      this.isExerciseRunning = true;

    }else{
      console.log('not selected');
      this.toast.showToast({message: 'mkmk', type: 'error'})
    }
  }

  stopTimer(): void{
    this.isExerciseRunning = false;
  }
}
