import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-result',
  standalone: true,
  imports: [],
  templateUrl: './input-result.component.html',
  styleUrl: './input-result.component.css'
})
export class InputResultComponent {
  @Output() userAnswerChange = new EventEmitter<number>();

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const parsedValue = Number(inputValue);
    if (!isNaN(parsedValue)) {
      this.userAnswerChange.emit(parsedValue);
    }
  }
}
