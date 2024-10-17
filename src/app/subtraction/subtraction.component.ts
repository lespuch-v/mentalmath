import { Component } from '@angular/core';
import { MyChartComponent } from "../my-chart/my-chart.component";

@Component({
  selector: 'app-subtraction',
  standalone: true,
  imports: [MyChartComponent],
  templateUrl: './subtraction.component.html',
  styleUrl: './subtraction.component.css'
})
export class SubtractionComponent {

}
