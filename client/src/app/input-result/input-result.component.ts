import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-result',
  standalone: true,
  imports: [],
  templateUrl: './input-result.component.html',
  styleUrl: './input-result.component.css'
})
export class InputResultComponent {
  @Input() mathProblemValue: string | number = '';

}
