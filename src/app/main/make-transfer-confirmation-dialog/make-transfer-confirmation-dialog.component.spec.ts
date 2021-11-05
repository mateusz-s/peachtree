import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTransferConfirmationDialogComponent } from './make-transfer-confirmation-dialog.component';

describe('MakeTransferConfirmationDialogComponent', () => {
  let component: MakeTransferConfirmationDialogComponent;
  let fixture: ComponentFixture<MakeTransferConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeTransferConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
