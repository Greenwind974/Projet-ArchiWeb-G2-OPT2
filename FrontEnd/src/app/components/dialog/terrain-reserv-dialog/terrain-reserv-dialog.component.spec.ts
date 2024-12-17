import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainReservDialogComponent } from './terrain-reserv-dialog.component';

describe('TerrainReservDialogComponent', () => {
  let component: TerrainReservDialogComponent;
  let fixture: ComponentFixture<TerrainReservDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainReservDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrainReservDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
