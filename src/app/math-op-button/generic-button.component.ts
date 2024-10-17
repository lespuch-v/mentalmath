import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirstLetterUpperCasePipe } from "../utils/first-letter-upper-case.pipe";
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [FirstLetterUpperCasePipe, NgClass, NgIf],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {

  @Input() label: string = 'Default';
  @Input() value!: string;
  @Input() type: 'button' | 'submit' = 'button'
  @Input() selectedValue: string = '';
  @Input() tooltipContent?: string;
  @Input() buttonClasses: string = 'btn btn-outline btn-sm';
  @Output() valueSelected = new EventEmitter<any>();

  showTooltip: boolean = false;

  onClick(): void {
    this.valueSelected.emit(this.value)
  }

  toggleTooltip(show: boolean): void {
    this.showTooltip = show;
  }
}
