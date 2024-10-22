import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { PointSystemService } from '../point-system.service';
import { Subscription } from 'rxjs';

interface DifficultyStats {
  difficulty: string;
  totalAttempts: number;
  correctAttempts: number;
  averagePoints: number;
  successRate: number;
}

@Component({
  selector: 'app-difficulty-performance',
  standalone: true,
  template: `
    <div class="outer-container">
      <div class="chart-container">
        <canvas #chartCanvas id="difficultyChart"></canvas>
      </div>
    </div>
  `,
  styles: [`
    .outer-container {
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
    }
    .chart-container {
      position: relative;
      height: 400px;
      width: 100%;
      background: var(--base-200);
      border-radius: 1rem;
      padding: 1rem;
      box-sizing: border-box;
    }
  `]
})
export class DifficultyPerformanceComponent implements OnInit, OnDestroy {
  private chart: Chart | null = null;
  private subscription: Subscription | null = null;
  private difficultyStats: Map<string, DifficultyStats> = new Map();
  private chartInstance: Chart | null = null;

  // Difficulty levels from your existing config
  private difficulties = [
    'easy',
    'intermediate',
    'medium',
    'challenging',
    'hard',
    'expert'
  ];

  constructor(private pointSystem: PointSystemService) {
    Chart.register(...registerables);
    // Initialize stats for each difficulty
    this.difficulties.forEach(diff => {
      this.difficultyStats.set(diff, {
        difficulty: diff,
        totalAttempts: 0,
        correctAttempts: 0,
        averagePoints: 0,
        successRate: 0
      });
    });
  }

  ngOnInit(): void {
    // Small delay to ensure container is ready
    setTimeout(() => {
      this.createChart();
    }, 0);

    // Subscribe to point system updates
    this.subscription = this.pointSystem.points$.subscribe(() => {
      this.updateStats();
      this.updateChart();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private updateStats(): void {
    // This would ideally come from backend
    // For now, we'll simulate with current session data
    const stats = this.pointSystem.getAnswerStatistics();

    // Update stats for the current difficulty
    // Note: This is simplified for the demo
    // You'll want to track per-difficulty stats in your point system
    const currentStats = this.difficultyStats.get(this.difficulties[0]);
    if (currentStats) {
      currentStats.totalAttempts = stats.total;
      currentStats.correctAttempts = stats.correct;
      currentStats.successRate = stats.accuracy;
      currentStats.averagePoints = stats.averagePoints;
    }
  }

  private createChart(): void {
    const ctx = document.getElementById('difficultyChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.difficulties.map(diff => diff.charAt(0).toUpperCase() + diff.slice(1)),
        datasets: [
          {
            label: 'Success Rate (%)',
            data: Array.from(this.difficultyStats.values()).map(stat => stat.successRate),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 5,
          },
          {
            label: 'Average Points',
            data: Array.from(this.difficultyStats.values()).map(stat => stat.averagePoints),
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            borderRadius: 5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(156, 163, 175, 0.1)'
            },
            ticks: {
              color: 'rgb(156 163 175)'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgb(156 163 175)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'center',
            labels: {
              padding: 20,
              color: 'rgb(156 163 175)',
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              label: (context) => {
                const difficultyStats = Array.from(this.difficultyStats.values())[context.dataIndex];
                const label = context.dataset.label || '';
                const value = context.parsed.y;

                if (label === 'Success Rate (%)') {
                  return `${label}: ${value.toFixed(1)}% (${difficultyStats.correctAttempts}/${difficultyStats.totalAttempts})`;
                }
                return `${label}: ${value.toFixed(0)}`;
              }
            }
          }
        }
      }
    };

    this.chartInstance = new Chart(ctx, config);
  }

  private updateChart(): void {
    if (!this.chartInstance) return;

    const stats = Array.from(this.difficultyStats.values());

    this.chartInstance.data.datasets[0].data = stats.map(stat => stat.successRate);
    this.chartInstance.data.datasets[1].data = stats.map(stat => stat.averagePoints);

    this.chartInstance.update('none'); // Use 'none' mode to prevent animations during updates
  }
}
