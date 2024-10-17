import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'difficulty-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './difficulty-button.component.html',
  styleUrl: './difficulty-button.component.css'
})
export class DifficultyButtonComponent implements OnChanges {
  @Input() label: string = 'Button';
  @Input() variant!: string;
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  buttonClasses: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['variant']) {
      this.updateButtonClasses();
    }
  }

  private updateButtonClasses(): void {

    switch (this.variant) {
      case 'basic':
        this.buttonClasses = 'btn btn-sm difficulty-easy bg-green-200 dark:bg-green-600 text-black dark:text-white hover:bg-green-300 dark:hover:bg-green-500';
        break;
      case 'easy':
        this.buttonClasses = 'btn btn-sm difficulty-easy bg-green-400 dark:bg-green-700 text-white hover:bg-green-500 dark:hover:bg-green-600';
        break;
      case 'medium':
        this.buttonClasses = 'btn btn-sm difficulty-medium bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white hover:bg-yellow-500 dark:hover:bg-yellow-500';
        break;
      case 'hard':
        this.buttonClasses = 'btn btn-sm difficulty-hard bg-red-500 dark:bg-red-700 text-white hover:bg-red-600 dark:hover:bg-red-600';
        break;
      case 'mix':
        this.buttonClasses = 'btn-sm difficulty-mix bg-gray-800 text-white text-center rounded-lg transition-all duration-300 font-semibold';
        break;
      default:
        this.buttonClasses = 'btn';
    }
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
