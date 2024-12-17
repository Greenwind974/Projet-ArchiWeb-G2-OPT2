import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservDeleteDialogComponent } from './reserv-delete-dialog.component';

describe('ReservDeleteDialogComponent', () => {
  let component: ReservDeleteDialogComponent;
  let fixture: ComponentFixture<ReservDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
