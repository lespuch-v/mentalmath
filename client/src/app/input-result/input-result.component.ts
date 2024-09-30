import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-result',
  standalone: true,
  imports: [],
  templateUrl: './input-result.component.html',
  styleUrl: './input-result.component.css'
})
export class InputResultComponent {
  @Input() mathProblemValue: string | number = '';
  @Output() userCalculations = new EventEmitter<string | number>();

  handleUserInput($event: Event): void {
    const inputElement = $event.target as HTMLInputElement;
    const value = inputElement.value;
    console.log(value);
    
    this.userCalculations.emit(value);
  }

}
