import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from './form.component';
import { FormField } from '@/domain/models/Form';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with the provided fields', () => {
      const mockFields: FormField[] = [
        { name: 'name', label: 'Name', type: 'text', validators: [] },
        { name: 'age', label: 'Age', type: 'number', validators: [] },
      ];
      component.fields = mockFields;
      component.ngOnInit();

      expect(component.form.contains('name')).toBeTruthy();
      expect(component.form.contains('age')).toBeTruthy();
    });
  });

  describe('getErrorMessage', () => {
    beforeEach(() => {
      component.fields = [{ name: 'name', label: 'Name', type: 'text', validators: [] }];
      component.ngOnInit();
    });

    it('should return "This field must be at most X characters long" if maxlength validator fails', () => {
      const control = component.getControl('name');
      control.setValidators([Validators.maxLength(10)]);
      control.setValue('This is too long');
      control.markAsTouched();
      control.updateValueAndValidity();

      expect(component.getErrorMessage('name')).toBe('This field must be at most 10 characters long');
    });

    it('should return "Email format must be valid" if email validator fails', () => {
      const control = component.getControl('name');
      control.setValidators([Validators.email]);
      control.setValue('invalid-email');
      control.markAsTouched();
      control.updateValueAndValidity();

      expect(component.getErrorMessage('name')).toBe('Email format must be valid');
    });

    it('should return "Age must be greater than 18" if minAge validator fails', () => {
      const control = component.getControl('name');
      control.setErrors({ minAge: true });
      control.markAsTouched();

      expect(component.getErrorMessage('name')).toBe('Age must be greater than 18');
    });

    it('should return "This field is required" if the required validator fails', () => {
      const control = component.getControl('name');
      control.setValidators([Validators.required]);
      control.markAsTouched();
      control.updateValueAndValidity();

      expect(component.getErrorMessage('name')).toBe('This field is required');
    });

    it('should return "This field must be at least X characters long" if minlength validator fails', () => {
      const control = component.getControl('name');
      control.setValidators([Validators.minLength(5)]);
      control.setValue('abc');
      control.markAsTouched();
      control.updateValueAndValidity();

      expect(component.getErrorMessage('name')).toBe('This field must be at least 5 characters long');
    });

    it('should return "This field must be greater than X" if min validator fails', () => {
      const control = component.getControl('name');
      control.setValidators([Validators.min(10)]);
      control.setValue(5);
      control.markAsTouched();
      control.updateValueAndValidity();

      expect(component.getErrorMessage('name')).toBe('This field must be greater than 10');
    });

    it('should return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character" if invalidPassword error exists', () => {
      const control = component.getControl('name');
      control.setErrors({ invalidPassword: true });
      control.markAsTouched();

      expect(component.getErrorMessage('name')).toBe(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
      );
    });

    it('should return an empty string if there are no errors or the field is not touched', () => {
      const control = component.getControl('name');
      control.setValue('valid value');
      control.markAsUntouched();
      control.updateValueAndValidity();

      expect(component.getErrorMessage('name')).toBe('');
    });
  });

  describe('submitForm', () => {
    it('should emit onSubmit with form value when form is valid', () => {
      const mockFields: FormField[] = [
        { name: 'name', label: 'Name', type: 'text', validators: [] }
      ];
      component.fields = mockFields;
      component.ngOnInit();

      const emitSpy = jest.spyOn(component.onSubmit, 'emit');
      component.getControl('name').setValue('Test Name');

      component.submitForm();

      expect(emitSpy).toHaveBeenCalledWith({ name: 'Test Name' });
      expect(component.form.valid).toBeTruthy();
    });

    it('should reset the form after a successful submission', () => {
      const mockFields: FormField[] = [
        { name: 'name', label: 'Name', type: 'text', validators: [] }
      ];
      component.fields = mockFields;
      component.ngOnInit();

      component.getControl('name').setValue('Test Name');
      component.submitForm();

      expect(component.form.pristine).toBeTruthy();
      expect(component.form.value).toEqual({ name: null });
    });

    it('should not emit onSubmit if form is invalid', () => {
      const mockFields: FormField[] = [
        { name: 'name', label: 'Name', type: 'text', validators: [Validators.required] }
      ];
      component.fields = mockFields;
      component.ngOnInit();

      const emitSpy = jest.spyOn(component.onSubmit, 'emit');
      component.submitForm();

      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
