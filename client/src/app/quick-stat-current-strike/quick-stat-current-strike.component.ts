import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { QuickStatService } from '../quick-stat.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quick-stat-current-strike',
  standalone: true,
  imports: [NgIf],
  templateUrl: './quick-stat-current-strike.component.html',
  styleUrl: './quick-stat-current-strike.component.css',
})
export class QuickStatCurrentStrikeComponent implements OnInit, OnChanges {
  @Input() currentStrike!: number;
  isPlusOneActive: boolean = false;

  constructor(private calculateStat: QuickStatService){}

  ngOnInit(): void {
    this.currentStrike = this.calculateStat.getCurrentStrike();

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['currentStrike']){
      this.isPlusOneActive = true;

      setTimeout(() => {
        this.isPlusOneActive = false;
      }, 250);
    }
  }
}
