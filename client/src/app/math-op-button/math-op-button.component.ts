import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FirstLetterUpperCasePipe } from "../utils/first-letter-upper-case.pipe";

@Component({
  selector: 'math-op-button',
  standalone: true,
  imports: [FirstLetterUpperCasePipe],
  templateUrl: './math-op-button.component.html',
  styleUrl: './math-op-button.component.css'
})
export class MathOpButtonComponent {

  @Input() label: string = 'Default';
  @Input() mathOperation!: string;
  @Output() clicked = new EventEmitter<string>()

  onClick(): void {
    console.log(this.mathOperation);
    
    this.clicked.emit(this.mathOperation)
  }

}
