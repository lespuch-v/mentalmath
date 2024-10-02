import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quick-stat-current-strike',
  standalone: true,
  imports: [NgIf],
  templateUrl: './quick-stat-current-strike.component.html',
  styleUrl: './quick-stat-current-strike.component.css',
})
export class QuickStatCurrentStrikeComponent implements OnChanges {
  @Input() currentStrike!: number;
  isPlusOneActive: boolean = false;

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentStrike']){
      this.isPlusOneActive = true;

      setTimeout(() => {
        this.isPlusOneActive = false;
      }, 150)
    }
  }
}
