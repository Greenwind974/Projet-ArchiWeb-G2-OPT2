import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnectDialogComponent } from './deconnect-dialog.component';

describe('DeconnectDialogComponent', () => {
  let component: DeconnectDialogComponent;
  let fixture: ComponentFixture<DeconnectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeconnectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeconnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
