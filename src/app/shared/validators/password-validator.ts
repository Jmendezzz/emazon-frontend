import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_./])[A-Za-z\d@$!%*?&_./]{8,}$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }