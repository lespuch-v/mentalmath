import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PointSystemService } from '../point-system.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  template: `
    <div class="chart-container" style="position: relative; height: 100%; width: 100%;">
      <canvas #chartCanvas id="{{chartId}}"></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      min-height: 200px;
      margin: 0 auto;
    }
  `]
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
  private chart: Chart<'doughnut'> | null = null;
  private subscription: Subscription | null = null;
  chartId: string = 'answersChart';

  constructor(private pointSystem: PointSystemService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.createChart();
    }, 0);

    this.subscription = this.pointSystem.points$.subscribe(() => {
      if (this.chart) {
        this.updateChartData();
      } else {
        this.createChart();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stats = this.pointSystem.getAnswerStatistics();
    const hasNoData = stats.correct === 0 && stats.incorrect === 0;

    // Initialize with a single value if there's no data
    const data = hasNoData ? [1] : [stats.correct, stats.incorrect];
    const labels = hasNoData ? ['No answers yet'] : ['Correct', 'Incorrect'];
    const colors = hasNoData ?
      ['rgba(156, 163, 175, 0.3)'] :
      [
        'rgba(75, 192, 192, 0.8)',   // Green for correct
        'rgba(255, 99, 132, 0.8)'    // Red for incorrect
      ];
    const borderColors = hasNoData ?
      ['rgba(156, 163, 175, 0.5)'] :
      [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)'
      ];

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgb(156 163 175)'
            }
          },
          title: {
            display: true,
            text: 'Answer Statistics',
            color: 'rgb(156 163 175)'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (hasNoData) return 'Start answering to see statistics';
                const total = stats.total || 0;
                const value = context.raw as number;
                const percentage = total > 0 ? (value / total * 100).toFixed(1) : '0';
                return `${context.label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, config);
  }

  private updateChartData(): void {
    if (!this.chart) return;

    const stats = this.pointSystem.getAnswerStatistics();
    const hasNoData = stats.correct === 0 && stats.incorrect === 0;

    if (hasNoData) {
      this.chart.data.labels = ['No answers yet'];
      this.chart.data.datasets[0].data = [1];
      this.chart.data.datasets[0].backgroundColor = ['rgba(156, 163, 175, 0.3)'];
      this.chart.data.datasets[0].borderColor = ['rgba(156, 163, 175, 0.5)'];
    } else {
      this.chart.data.labels = ['Correct', 'Incorrect'];
      this.chart.data.datasets[0].data = [stats.correct, stats.incorrect];
      this.chart.data.datasets[0].backgroundColor = [
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 99, 132, 0.8)'
      ];
      this.chart.data.datasets[0].borderColor = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)'
      ];
    }

    this.chart.update();
  }
}
