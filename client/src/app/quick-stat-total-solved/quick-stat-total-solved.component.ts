import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QuickStatService } from '../services/quick-stat.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-quick-stat-total-solved',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './quick-stat-total-solved.component.html',
  styleUrl: './quick-stat-total-solved.component.css'
})
export class QuickStatTotalSolvedComponent {
  totalChallengesSolved$!: Observable<number>;

  constructor(private quickStatService: QuickStatService){}

  ngOnInit(): void{
    console.log('QuickStatTotalSolvedComponent initialized');
    this.totalChallengesSolved$ = this.quickStatService.totalChallengesSolved$;
    this.totalChallengesSolved$.subscribe(value => {
      console.log('Total challenges solved updated:', value);
    });
  }
}
