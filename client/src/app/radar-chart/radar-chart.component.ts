import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, PointStyle, ScriptableContext } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent {

  @Input() chartId: string = 'myRadarChart';
  @Input() labels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  @Input() data: number[] = [20, 30, 40, 50, 60, 70, 80];
  @Input() chartTitle: string = 'Radar Chart';
  @Input() datasets: { label: string, data: number[] }[] = [];

  private chart!: Chart<'radar', number[], unknown>;

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
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: this.datasets.length > 0 ? this.datasets : [
            {
              label: this.chartTitle,
              data: this.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 5,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 3,
              borderColor: 'rgba(75, 192, 192, 1)'
            },
            point: {
              radius: (ctx: ScriptableContext<'radar'>) => this.adjustRadiusBasedOnData(ctx),
              pointStyle: (ctx: ScriptableContext<'radar'>) => this.alternatePointStyles(ctx),
              hoverRadius: 15
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {

              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.parsed.r}`;
                }
              }
            }
          },
          scales: {
            r: {
              angleLines: {
                display: true,
                color: 'rgba(75, 192, 192, 0.5)'
              },
              grid: {
                display: true,
                color: 'rgba(75, 192, 192, 0.2)'
              },
              ticks: {
                display: true,
                maxTicksLimit: 0,
                showLabelBackdrop: false,
                color: 'rgba(75, 192, 192, 1)'
              },
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
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        },
      ];
      this.chart.update();
    }
  }

  adjustRadiusBasedOnData(ctx: ScriptableContext<'radar'>): number {
    const v = ctx.parsed.r;
    return v < 10 ? 5 : v < 25 ? 7 : v < 50 ? 9 : v < 75 ? 11 : 15;
  }

  alternatePointStyles(ctx: ScriptableContext<'radar'>): PointStyle {
    const index = ctx.dataIndex;
    return index % 2 === 0 ? 'circle' : 'rect';
  }
}
