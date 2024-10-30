import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { InputFormRowComponent } from './input-form-row.component';
import { DropdownOption } from '../dropdown/dropdown-types';

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
    component.control.setErrors(null); 
    expect(component.getInputVariant()).toBe('default');
  });

  it('should return "default" variant if control is invalid but untouched', () => {
    component.control.setErrors({ required: true }); 
    component.control.markAsPristine(); 
    expect(component.getInputVariant()).toBe('default');
  });

  it('should return "default" variant if control is valid and untouched', () => {
    component.control.setValue('valid value');
    component.control.markAsPristine();
    component.control.setErrors(null); 
    expect(component.getInputVariant()).toBe('default');
  });

  it('should handle pristine and invalid control', () => {
    component.control.setValue('');
    component.control.markAsPristine(); 
    component.control.setErrors({ required: true }); 
    expect(component.getInputVariant()).toBe('default');
  });
  it('should return dropdown options if they are defined', () => {
    const dropdownOptions: DropdownOption[] = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ];
    component.dropdownOptions = dropdownOptions;
    expect(component.getDropdownOptions()).toEqual(dropdownOptions);
  });

  it('should throw an error if dropdown options are not defined', () => {
    component.dropdownOptions = undefined;
    expect(() => component.getDropdownOptions()).toThrowError('Dropdown options are required');
  });

  it('should return max dropdown selections if it is defined', () => {
    const maxSelections = 3;
    component.maxDropdownSelections = maxSelections;
    expect(component.getDropdownMaxSelections()).toBe(maxSelections);
  });

  it('should throw an error if max dropdown selections are not defined', () => {
    component.maxDropdownSelections = undefined;
    expect(() => component.getDropdownMaxSelections()).toThrowError('Max dropdown selections are required');
  });
});

