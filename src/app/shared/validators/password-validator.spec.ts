import { AbstractControl } from '@angular/forms';
import { passwordValidator } from './password-validator';

describe('passwordValidator', () => {

  it('should return null for a valid password', () => {
    // Test case: a valid password that meets all the criteria
    const control = { value: 'Valid123!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toBeNull(); // Valid password should pass validation
  });

  it('should return an error for a password without lowercase letter', () => {
    // Test case: a password without a lowercase letter
    const control = { value: 'INVALID123!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); // Missing lowercase letter
  });

  it('should return an error for a password without uppercase letter', () => {
    // Test case: a password without an uppercase letter
    const control = { value: 'invalid123!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); // Missing uppercase letter
  });

  it('should return an error for a password without a number', () => {
    // Test case: a password without a number
    const control = { value: 'InvalidPassword!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); // Missing number
  });

  it('should return an error for a password without a special character', () => {
    // Test case: a password without a special character
    const control = { value: 'Invalid123' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); // Missing special character
  });

  it('should return an error for a password shorter than 8 characters', () => {
    // Test case: a password shorter than 8 characters
    const control = { value: 'Inv1!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); // Password too short
  });

  it('should return null for a valid password with special characters', () => {
    // Test case: a password with special characters that is valid
    const control = { value: 'Valid$123' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toBeNull(); // Password with special characters should pass
  });

});
