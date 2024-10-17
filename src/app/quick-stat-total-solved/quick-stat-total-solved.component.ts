import { Component, OnInit } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { QuickStatService } from '../services/quick-stat.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-quick-stat-total-solved',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './quick-stat-total-solved.component.html',
  styleUrl: './quick-stat-total-solved.component.css'
})
export class QuickStatTotalSolvedComponent implements OnInit{
  totalChallengesSolved$!: Observable<number>;


  constructor(private quickStatService: QuickStatService){}

  ngOnInit(): void{
    this.totalChallengesSolved$ = this.quickStatService.totalChallengesSolved$.pipe(
      startWith(0)
    );
  }
}
