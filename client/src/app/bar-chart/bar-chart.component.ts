import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @Input() chartId: string = 'myBarChart';
  @Input() labels: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  @Input() data: number[] = [65, 59, 80, 81, 56];
  @Input() chartTitle: string = 'Default Chart Title';

  private chart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

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
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.chartTitle,
              data: this.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
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
        },
      });
    } else {
      console.error('Chart context could not be retrieved.');
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.data;
      this.chart.data.datasets[0].label = this.chartTitle;
      this.chart.update();
    }
  }
}
