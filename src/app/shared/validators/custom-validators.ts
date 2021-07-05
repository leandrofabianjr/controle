import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  private static isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }

  static greaterThan(greaterThan: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.isEmptyInputValue(control.value) ||
        this.isEmptyInputValue(greaterThan)
      ) {
        return null;
      }
      const value = parseFloat(control.value);
      console.log('com erro');
      return !isNaN(value) && value <= greaterThan
        ? { greaterThan: { greaterThan: greaterThan, actual: control.value } }
        : null;
    };
  }
}
