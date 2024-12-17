import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainConnectDialogComponent } from './terrain-connect-dialog.component';

describe('TerrainConnectDialogComponent', () => {
  let component: TerrainConnectDialogComponent;
  let fixture: ComponentFixture<TerrainConnectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerrainConnectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerrainConnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
