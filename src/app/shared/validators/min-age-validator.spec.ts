import { AbstractControl } from '@angular/forms';
import { minAgeValidator } from './min-age-validator';

describe('minAgeValidator', () => {
  const minAge = 18;

  it('should return null if the age is greater than or equal to the minimum age', () => {
    // Test case: date of birth that results in an age of 20 years.
    const control = { value: '2004-01-01' } as AbstractControl;
    const result = minAgeValidator(minAge)(control);
    expect(result).toBeNull(); // Age 20 is >= 18, should pass validation
  });

  it('should return an error if the age is less than the minimum age', () => {
    // Test case: date of birth that results in an age of 16 years.
    const control = { value: '2008-01-01' } as AbstractControl;
    const result = minAgeValidator(minAge)(control);
    expect(result).toEqual({ minAge: true }); // Age 16 is < 18, should fail validation
  });

  it('should return null if the control value is empty', () => {
    // Test case: empty value should not trigger validation.
    const control = { value: null } as AbstractControl;
    const result = minAgeValidator(minAge)(control);
    expect(result).toBeNull(); // Empty value should pass validation without errors
  });

  it('should correctly handle the current date when calculating age', () => {
    // Test case: birthday today, should result in age 0.
    const control = { value: new Date().toISOString() } as AbstractControl;
    const result = minAgeValidator(minAge)(control);
    expect(result).toEqual({ minAge: true }); // Age 0 is < 18, should fail validation
  });

  it('should return null if the age is exactly the minimum age', () => {
    // Test case: date of birth exactly 18 years ago.
    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
    const control = { value: eighteenYearsAgo.toISOString() } as AbstractControl;
    const result = minAgeValidator(minAge)(control);
    expect(result).toBeNull(); // Age 18 should pass validation
  });
});
