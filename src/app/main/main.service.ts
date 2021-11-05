import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MakeTransferConfirmationDialogComponent } from './make-transfer-confirmation-dialog/make-transfer-confirmation-dialog.component';

@Injectable()
export class MainService {
  constructor(
    private ngbModal: NgbModal,
    private ngbModalConfig: NgbModalConfig,
  ) {
    ngbModalConfig.backdrop = 'static';
    ngbModalConfig.keyboard = false;
    ngbModalConfig.centered = true;
    ngbModalConfig.size = 'lg';
  }

  showMakeTransferConfirmationDialog(modalContent): Promise<boolean> {
    const modalRef = this.ngbModal.open(
      MakeTransferConfirmationDialogComponent
    );
    modalRef.componentInstance.btnContinueText =
      modalContent.btnContinueText || 'Send Transfer';
    modalRef.componentInstance.btnCancelText =
      modalContent.btnCancelText || 'Close';
    modalRef.componentInstance.onContinueCallback =
      modalContent.onContinueCallback;
    modalRef.componentInstance.transferData = modalContent.transferData;
    return modalRef.result;
  }
}
