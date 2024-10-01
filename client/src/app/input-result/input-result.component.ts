import { JsonPipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-result',
  standalone: true,
  imports: [NgClass, JsonPipe],
  templateUrl: './input-result.component.html',
  styleUrl: './input-result.component.css',
})
export class InputResultComponent implements AfterViewInit {
  @Output() userAnswerChange = new EventEmitter<number>();
  @Output() enterPressed = new EventEmitter<void>();
  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;
  @ViewChild('mirrorSpan') mirrorSpan!: ElementRef<HTMLSpanElement>;

  inputValue: string = '';
  placeholder: string = ' ';
  @Input() correct!: boolean | null;

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

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.enterPressed.emit();
      setTimeout(() => {
        this.textInput.nativeElement.value = '';
        this.textInput.nativeElement.classList.remove('correct-answer')
        this.textInput.nativeElement.classList.remove('correct-answer')
      },500)
    }
  }

  private adjustInputWidth(): void {
    const spanWidth = this.mirrorSpan.nativeElement.offsetWidth;
    this.textInput.nativeElement.style.width = `${spanWidth + 55}px`;
  }
}