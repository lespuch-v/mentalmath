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
        type: 'line', // Changed from 'bar' to 'line'
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.chartTitle,
              data: this.data,
              fill: false, // For line charts, determines if the area under the line should be filled
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.4, // Smooths the line between points, 0 means straight lines
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
