import { AbstractControl } from '@angular/forms';
import { passwordValidator } from './password-validator';

describe('passwordValidator', () => {

  it('should return null for a valid password', () => {
    const control = { value: 'Valid123!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toBeNull(); 
  });

  it('should return an error for a password without lowercase letter', () => {
    const control = { value: 'INVALID123!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); 
  });

  it('should return an error for a password without uppercase letter', () => {
    const control = { value: 'invalid123!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); 
  });

  it('should return an error for a password without a number', () => {
    const control = { value: 'InvalidPassword!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); 
  });

  it('should return an error for a password without a special character', () => {
    const control = { value: 'Invalid123' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true }); 
  });

  it('should return an error for a password shorter than 8 characters', () => {
    const control = { value: 'Inv1!' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toEqual({ invalidPassword: true });
  });

  it('should return null for a valid password with special characters', () => {
    const control = { value: 'Valid$123' } as AbstractControl;
    const result = passwordValidator()(control);
    expect(result).toBeNull(); 
  });

});
