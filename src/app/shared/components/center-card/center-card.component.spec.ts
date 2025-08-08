import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterCardComponent } from './center-card.component';

describe('GymCardComponent', () => {
  let component: CenterCardComponent;
  let fixture: ComponentFixture<CenterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
