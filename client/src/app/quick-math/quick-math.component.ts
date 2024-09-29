import { Component } from '@angular/core';
import { CalculationsService } from '../calculations.service';
import { Exercise } from '../models';
import { DifficultyButtonComponent } from "../difficulty-button/difficulty-button.component";

@Component({
  selector: 'app-quick-math',
  standalone: true,
  imports: [DifficultyButtonComponent],
  templateUrl: './quick-math.component.html',
  styleUrl: './quick-math.component.css'
})
export class QuickMathComponent {
  selectedDifficulty: string = ''
  arithmeticOperation: string = 'addition';
  mathProblem: Exercise = {
    question: '',
    answer: 0,
    type: '',
    difficulty: ''
  };

  constructor(private calculations: CalculationsService){}

  handleDifficultySelection(difficulty: string): void {

   this.calculations.generateExercise(difficulty, this.arithmeticOperation).subscribe(resolve => {
    console.log(resolve);
    this.mathProblem = resolve
   })
  }

  handleMathOperation(mathOperation: string): void{
    this.arithmeticOperation = mathOperation;
  }
}
