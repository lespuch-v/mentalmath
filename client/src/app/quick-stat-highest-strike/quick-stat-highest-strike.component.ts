import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuickStatService } from '../quick-stat.service';

@Component({
  selector: 'app-quick-stat-highest-strike',
  standalone: true,
  imports: [],
  templateUrl: './quick-stat-highest-strike.component.html',
  styleUrl: './quick-stat-highest-strike.component.css'
})
export class QuickStatHighestStrikeComponent implements OnInit, OnChanges{
  highestStrike!: number;
  isPlusOneActive: boolean = false;

  constructor(private calculateStat: QuickStatService){}

  ngOnInit(): void {
    this.highestStrike = this.calculateStat.getHighestStrike();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.highestStrike);
    
    if(changes['highestStrike']){
      this.highestStrike = this.calculateStat.getHighestStrike();
    }
  }

}
