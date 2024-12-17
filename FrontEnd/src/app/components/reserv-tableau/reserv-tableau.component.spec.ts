import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservTableauComponent } from './reserv-tableau.component';

describe('ReservTableauComponent', () => {
  let component: ReservTableauComponent;
  let fixture: ComponentFixture<ReservTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservTableauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
