import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuickStatService } from '../services/quick-stat.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-quick-stat-highest-strike',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './quick-stat-highest-strike.component.html',
  styleUrl: './quick-stat-highest-strike.component.css'
})
export class QuickStatHighestStrikeComponent implements OnInit{
  highestStrike$!: Observable<number>;
  isPlusOneActive: boolean = false;

  constructor(private quickStatService: QuickStatService){}

  ngOnInit(): void {
    this.highestStrike$ = this.quickStatService.highestStrike$;
  }
}
