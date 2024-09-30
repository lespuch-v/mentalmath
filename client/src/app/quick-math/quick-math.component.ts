import { Component, OnInit } from '@angular/core';
import { CalculationsService } from '../calculations.service';
import { Exercise } from '../models';
import { DifficultyButtonComponent } from "../difficulty-button/difficulty-button.component";
import { NgIf } from '@angular/common';
import { InputResultComponent } from "../input-result/input-result.component";

@Component({
  selector: 'app-quick-math',
  standalone: true,
  imports: [DifficultyButtonComponent, NgIf, InputResultComponent],
  templateUrl: './quick-math.component.html',
  styleUrl: './quick-math.component.css'
})
export class QuickMathComponent implements OnInit {
  selectedDifficulty: string = 'basic'
  arithmeticOperation: string = 'addition';
  mathProblem: Exercise | null = null;

  constructor(private calculations: CalculationsService) { }

  ngOnInit(): void {
    this.handleDifficultySelection(this.selectedDifficulty);
  }

  handleDifficultySelection(difficulty: string): void {

    this.calculations.generateExercise(difficulty, this.arithmeticOperation).subscribe(resolve => {
      this.mathProblem = resolve
    })
  }

  handleMathOperation(mathOperation: string): void {
    this.arithmeticOperation = mathOperation;
  }
}
