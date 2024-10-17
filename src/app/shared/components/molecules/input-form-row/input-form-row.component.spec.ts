import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { InputFormRowComponent } from './input-form-row.component';

describe('InputFormRowComponent', () => {
  let component: InputFormRowComponent;
  let fixture: ComponentFixture<InputFormRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFormRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFormRowComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(); 
  });

  it('should return "error" variant if control is invalid and touched', () => {
    component.control.setErrors({ required: true }); 
    component.control.markAsTouched();
    expect(component.getInputVariant()).toBe('error');
  });

  it('should return "default" variant if control is valid and touched', () => {
    component.control.setValue('valid value');
    component.control.markAsTouched();
    component.control.setErrors(null); // Valid
    expect(component.getInputVariant()).toBe('default');
  });

  it('should return "default" variant if control is invalid but untouched', () => {
    component.control.setErrors({ required: true }); 
    component.control.markAsPristine(); // Untouched
    expect(component.getInputVariant()).toBe('default');
  });

  it('should return "default" variant if control is valid and untouched', () => {
    component.control.setValue('valid value');
    component.control.markAsPristine(); // Untouched
    component.control.setErrors(null); // Valid
    expect(component.getInputVariant()).toBe('default');
  });

  it('should handle pristine and invalid control', () => {
    component.control.setValue('');
    component.control.markAsPristine(); // Untouched
    component.control.setErrors({ required: true }); // Invalid but untouched
    expect(component.getInputVariant()).toBe('default');
  });
});

