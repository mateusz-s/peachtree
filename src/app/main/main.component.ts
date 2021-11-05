import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MainService } from './main.service';
import { accountBalanceValidator } from '../../validators/account-balance.validator';
import { data } from '../../mock-data/transactions.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MainService],
})
export class MainComponent implements OnInit {
  makeTransferForm: FormGroup;
  transactionsList = data;
  filteredTransactionsList = data;
  fromAccountInitial = 5824.76;
  initalMakeTransferFormValues = {
    fromAccount: this.fromAccountInitial,
  };
  transactionFilterValue = '';

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.createMakeTransferForm();
    this.makeTransferForm.patchValue(this.initalMakeTransferFormValues);
  }

  private createMakeTransferForm(): FormGroup {
    return (this.makeTransferForm = this.formBuilder.group({
      fromAccount: [{ value: null, disabled: true }],
      toAccount: [null, Validators.required],
      amount: [null, [Validators.required, accountBalanceValidator('fromAccount')]],
    }));
  }

  isControlInvalid(controlName = ''): boolean {
    return this.makeTransferForm.get(controlName).invalid
      && (this.makeTransferForm.get(controlName).dirty || this.makeTransferForm.get(controlName).touched);
  }

  isControlErrorVisible(controlName = ''): boolean {
    return this.makeTransferForm.get(controlName).invalid
      && this.makeTransferForm.get(controlName).errors
      && (this.makeTransferForm.get(controlName).dirty || this.makeTransferForm.get(controlName).touched);
  }

  submitMakeTransferForm() {
    if (this.makeTransferForm.status === 'VALID') {
      this.mainService.showMakeTransferConfirmationDialog({
        transferData: this.makeTransferForm.getRawValue(),
        onContinueCallback: () => {
          const { toAccount, amount } = this.makeTransferForm.getRawValue();
          const transactionItem = {
            categoryCode: '#1180aa',
            dates: {
              valueDate: moment().format('YYYY-MM-DD')
            },
            transaction: {
              amountCurrency: {
                amount,
                currencyCode: 'EUR'
              },
              type: 'Transaction',
              creditDebitIndicator: 'DBIT'
            },
            merchant: {
              name: toAccount,
              accountNumber: 'SI00000000000000000'
            }
          };
          this.transactionsList.push(transactionItem);
          this.filterTransactionsList(this.transactionFilterValue);
          this.fromAccountInitial -= +amount,
          this.makeTransferForm.reset({
            fromAccount: this.fromAccountInitial,
          });
          this.cdRef.detectChanges();
        }
      });
    }
  }

  colorAmountValue(value: number): string {
    const valueSign = Math.sign(value);
    switch (valueSign) {
      case 1:
        return 'text-success';
      case -1:
        return 'text-danger';
      default:
        return 'text-dark';
    }
  }

  filterTransactionsList(value: string): void {
    if (value) {
      this.transactionFilterValue = value;
      this.filteredTransactionsList = this.transactionsList.filter(
        ({ merchant }) => merchant.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    } else {
      this.transactionFilterValue = '';
      this.filteredTransactionsList = this.transactionsList;
    }
  }
}
