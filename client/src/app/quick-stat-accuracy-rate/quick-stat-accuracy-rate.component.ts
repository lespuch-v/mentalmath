import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QuickStatService } from '../services/quick-stat.service';
import { NgIf, AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-quick-stat-accuracy-rate',
  standalone: true,
  imports: [NgIf, AsyncPipe, DecimalPipe],
  templateUrl: './quick-stat-accuracy-rate.component.html',
  styleUrl: './quick-stat-accuracy-rate.component.css'
})
export class QuickStatAccuracyRateComponent {
  // Observable that holds the accuracy rate value
  accuracyRate$!: Observable<number>;

  // Injecting QuickStatService to access accuracy rate data
  constructor(private quickStatService: QuickStatService){}

  // Lifecycle hook that runs after component initialization
  ngOnInit(): void{
    this.accuracyRate$ = this.quickStatService.accuracyRate$;
  }
}
