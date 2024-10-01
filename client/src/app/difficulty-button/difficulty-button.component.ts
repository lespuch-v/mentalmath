import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'difficulty-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './difficulty-button.component.html',
  styleUrl: './difficulty-button.component.css'
})
export class DifficultyButtonComponent {
  @Input() label: string = 'Button';
  @Input() variant: 'math-operation' | 'difficulty-basic' | 'difficulty-easy' | 'difficulty-medium' | 'difficulty-hard' | 'difficulty-mix' = 'math-operation';
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    switch (this.variant) {
      case 'math-operation':
        return 'btn bg-blue-500 text-white hover:bg-blue-600';
      case 'difficulty-basic':
        return 'btn difficulty-easy bg-green-200 dark:bg-green-600 text-black dark:text-white hover:bg-green-300 dark:hover:bg-green-500';
      case 'difficulty-easy':
        return 'btn difficulty-easy bg-green-400 dark:bg-green-700 text-white hover:bg-green-500 dark:hover:bg-green-600';
      case 'difficulty-medium':
        return 'btn difficulty-medium bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white hover:bg-yellow-500 dark:hover:bg-yellow-500';
      case 'difficulty-hard':
        return 'btn difficulty-hard bg-red-500 dark:bg-red-700 text-white hover:bg-red-600 dark:hover:bg-red-600';
      case 'difficulty-mix':
        return 'btn difficulty-mix bg-gray-800 text-white rounded-lg transition-all duration-300 px-4 py-2';
      default:
        return 'btn';
    }
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
