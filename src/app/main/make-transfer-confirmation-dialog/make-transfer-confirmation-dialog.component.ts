import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-make-transfer-confirmation-dialog',
  templateUrl: './make-transfer-confirmation-dialog.component.html',
  styleUrls: ['./make-transfer-confirmation-dialog.component.scss'],
})
export class MakeTransferConfirmationDialogComponent implements OnInit {
  @Input() btnContinueText: string;
  @Input() btnCancelText: string;
  @Input() onContinueCallback;
  @Input() transferData;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  dismissModal(): void {
    this.activeModal.dismiss();
  }

  sendTransfer(): void {
    this.onContinueCallback();
    this.activeModal.close(true);
  }
}
