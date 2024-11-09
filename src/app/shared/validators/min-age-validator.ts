import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const dateOfBirth = new Date(control.value);
    const age = calculateAge(dateOfBirth);
    return age >= minAge ? null : { minAge: true };
  };
}

function calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    const dayDifference = today.getDate() - dateOfBirth.getDate();
  
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
  
    return age;
  }