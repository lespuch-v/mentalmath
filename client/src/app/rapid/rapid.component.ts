import { Component } from '@angular/core';
import { QuickMathComponent } from "../quick-math/quick-math.component";

@Component({
  selector: 'app-rapid',
  standalone: true,
  imports: [QuickMathComponent],
  templateUrl: './rapid.component.html',
  styleUrl: './rapid.component.css'
})
export class RapidComponent {

}
