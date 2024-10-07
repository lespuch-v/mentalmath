import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirstLetterUpperCasePipe } from "../utils/first-letter-upper-case.pipe";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [FirstLetterUpperCasePipe, NgClass],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {

  @Input() label: string = 'Default';
  @Input() value!: string;
  @Input() selectedValue: string = '';
  @Input() buttonClasses: string = 'btn btn-outline btn-sm'; // Customizable button classes
  @Output() valueSelected = new EventEmitter<any>(); // Generic output event

  onClick(): void {
    this.valueSelected.emit(this.value)
  }

}
