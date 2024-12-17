import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservModifFormComponent } from './reserv-modif-form.component';

describe('ReservModifFormComponent', () => {
  let component: ReservModifFormComponent;
  let fixture: ComponentFixture<ReservModifFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservModifFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservModifFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
