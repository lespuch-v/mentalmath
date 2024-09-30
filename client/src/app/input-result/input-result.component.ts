import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-result',
  standalone: true,
  imports: [],
  templateUrl: './input-result.component.html',
  styleUrl: './input-result.component.css'
})
export class InputResultComponent {
  mathProblemValue: any = '';
  @Output() userCalculations = new EventEmitter<number>();

  handleUserInput($event:  any): void {
    const inputElement = $event.target.value;
    const value = inputElement;    
    this.userCalculations.emit(value);
  }

}
