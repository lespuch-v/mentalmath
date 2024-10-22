import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PointSystemService } from '../point-system.service';
import { Subscription } from 'rxjs';

interface PointsProgress {
  timestamp: Date;
  points: number;
  totalPoints: number;
  nextLevelTarget: number;
}

@Component({
  selector: 'app-points-progress',
  standalone: true,
  template: `
    <div class="chart-wrapper">
      <canvas #chartCanvas id="pointsProgressChart"></canvas>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      width: 300px;
      height: 200px; /* Fixed height for consistent layout */
      position: relative;
    }
  `]
})
export class PointsProgressComponent implements OnInit, OnDestroy {
  private chart: Chart | null = null;
  private subscription: Subscription | null = null;
  private pointsData: PointsProgress[] = [];

  constructor(private pointSystem: PointSystemService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStoredData();

    setTimeout(() => {
      this.createChart();
    }, 0);

    this.subscription = this.pointSystem.points$.subscribe(() => {
      this.updatePointsData();
      this.updateChart();
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

  private loadStoredData(): void {
    const now = new Date();
    const demoData: PointsProgress[] = Array.from({ length: 7 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000),
      points: 0,
      totalPoints: 0,
      nextLevelTarget: 1000
    }));

    this.pointsData = demoData;
  }

  private updatePointsData(): void {
    const currentPoints = this.pointSystem.getTotalPoints();
    const lastPoints = this.pointSystem.getLastPoints();
    const levelProgress = this.pointSystem.getLevelProgress();

    if (lastPoints > 0) {
      const newProgress: PointsProgress = {
        timestamp: new Date(),
        points: lastPoints,
        totalPoints: currentPoints,
        nextLevelTarget: levelProgress.required
      };

      this.pointsData.push(newProgress);
      if (this.pointsData.length > 7) { // Reduced to 7 days for better visibility
        this.pointsData.shift();
      }
    }
  }

  private createChart(): void {
    const ctx = document.getElementById('pointsProgressChart') as HTMLCanvasElement;
    if (!ctx) return;

    const labels = this.pointsData.map(data =>
      data.timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    );

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Points',
            data: this.pointsData.map(data => data.points),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        layout: {
          padding: {
            top: 10,
            right: 5,
            bottom: 5,
            left: 5
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(156, 163, 175, 0.1)'
            },
            ticks: {
              color: 'rgb(156 163 175)',
              callback: (value) => `${value}`,
              maxTicksLimit: 5 // Limit the number of ticks for better readability
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgb(156 163 175)',
              maxRotation: 45,
              minRotation: 45,
              font: {
                size: 10 // Smaller font size for x-axis labels
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false // Remove legend to save space
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 8,
            titleFont: {
              size: 12
            },
            bodyFont: {
              size: 11
            },
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                return `Points: ${value.toFixed(0)}`;
              },
              title: (tooltipItems) => {
                const index = tooltipItems[0].dataIndex;
                const data = this.pointsData[index];
                return data.timestamp.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                });
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (!this.chart) return;

    const labels = this.pointsData.map(data =>
      data.timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    );

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = this.pointsData.map(data => data.points);

    this.chart.update('none');
  }
}
