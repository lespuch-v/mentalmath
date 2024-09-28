import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMathComponent } from './quick-math.component';

describe('QuickMathComponent', () => {
  let component: QuickMathComponent;
  let fixture: ComponentFixture<QuickMathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickMathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickMathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
