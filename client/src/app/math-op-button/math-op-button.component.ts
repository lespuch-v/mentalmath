import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FirstLetterUpperCasePipe } from "../utils/first-letter-upper-case.pipe";
import { NgClass } from '@angular/common';

@Component({
  selector: 'math-op-button',
  standalone: true,
  imports: [FirstLetterUpperCasePipe, NgClass],
  templateUrl: './math-op-button.component.html',
  styleUrl: './math-op-button.component.css'
})
export class MathOpButtonComponent {

  @Input() operationName: string = 'Default';
  @Input() operationType!: string;
  @Input() selectedOperation: string = '';
  @Output() operationSelected = new EventEmitter<string>()

  onClick(): void {
    this.operationSelected.emit(this.operationType)
  }

}
