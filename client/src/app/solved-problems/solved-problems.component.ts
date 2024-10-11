import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-solved-problems',
  standalone: true,
  imports: [],
  templateUrl: './solved-problems.component.html',
  styleUrl: './solved-problems.component.css'
})
export class SolvedProblemsComponent {

  @Input() numberOfSolvedChallenges: number = 0;
}
