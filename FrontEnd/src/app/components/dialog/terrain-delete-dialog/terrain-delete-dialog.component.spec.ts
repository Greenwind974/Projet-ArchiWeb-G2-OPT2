import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainDeleteDialogComponent } from './terrain-delete-dialog.component';

describe('TerrainDeleteDialogComponent', () => {
  let component: TerrainDeleteDialogComponent;
  let fixture: ComponentFixture<TerrainDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrainDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
