import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {

  @Input() chartId: string = 'myDoughnutChart';
  @Input() labels: string[] = ['Correct', 'Incorrect'];
  @Input() data: number[] = [75, 25];
  @Input() chartTitle: string = 'Math Problem Results';

  private chart: Chart<'doughnut'> | null = null;

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
      const config: ChartConfiguration<'doughnut', number[], string> = {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.chartTitle,
              data: this.data,
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)', // Color for 'Correct'
                'rgba(255, 99, 132, 0.6)', // Color for 'Incorrect'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: this.chartTitle,
            },
          },
        },
      };
      this.chart = new Chart(ctx, config);
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
