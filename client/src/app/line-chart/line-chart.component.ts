import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {

  @Input() chartId: string = 'myLineChart';
  @Input() labels: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  @Input() data: number[] = [65, 59, 80, 81, 56];
  @Input() chartTitle: string = 'Default Chart Title';
  @Input() difficultyLevels: string[] = []; // New input for multiple difficulty levels
  @Input() datasets: { label: string, data: number[] }[] = []; // New input to support multiple datasets

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart(): void {
    const ctx = (document.getElementById(this.chartId) as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets.length > 0 ? this.datasets : [
            {
              label: this.chartTitle,
              data: this.data,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.parsed.y} seconds`;
                }
              }
            }
          }
        },
      });
    } else {
      console.error('Chart context could not be retrieved.');
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets = this.datasets.length > 0 ? this.datasets : [
        {
          label: this.chartTitle,
          data: this.data,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          tension: 0.4,
        },
      ];
      this.chart.update();
    }
  }
}
