import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-result',
  standalone: true,
  imports: [],
  templateUrl: './input-result.component.html',
  styleUrl: './input-result.component.css'
})
export class InputResultComponent implements AfterViewInit {
  @Output() userAnswerChange = new EventEmitter<number>();
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
  @ViewChild('mirrorSpan') mirrorSpan!: ElementRef<HTMLSpanElement>;

  inputValue: string = '';
  placeholder: string = ' ';

  ngAfterViewInit(): void {
    // Initialize the input width
    this.adjustInputWidth();
  }

  onInputChange(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
    const parsedValue = Number(this.inputValue);
    if (!isNaN(parsedValue)) {
      this.userAnswerChange.emit(parsedValue);
    }
    this.adjustInputWidth();
  }

  private adjustInputWidth(): void {
    // Get the width of the mirror span
    const spanWidth = this.mirrorSpan.nativeElement.offsetWidth;
    // Set the input width to match the span width
    this.textInput.nativeElement.style.width = `${spanWidth + 55}px`; // Add some padding
  }
}