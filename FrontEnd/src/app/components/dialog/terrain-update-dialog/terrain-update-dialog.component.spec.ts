import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainUpdateDialogComponent } from './terrain-update-dialog.component';

describe('TerrainUpdateDialogComponent', () => {
  let component: TerrainUpdateDialogComponent;
  let fixture: ComponentFixture<TerrainUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrainUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
