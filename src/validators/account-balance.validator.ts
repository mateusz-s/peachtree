import { AbstractControl } from '@angular/forms';

export function accountBalanceValidator(parentControlName: string = '', balanceLimit = 500) {
  return function validate(formControl: AbstractControl) {
    const { parent, value } = formControl;

    if (!parent) {
      return null;
    }

    if (!value) {
      return null;
    }

    const parentControlValue = parent.get(parentControlName).value;

    if (+parentControlValue + +balanceLimit >= +value) {
      return null;
    } else {
      return {
        balanceError: true
      };
    }
  };
}
