import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { FormField } from '@/domain/models/Form';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

  const mockFields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [
        (control: any) => control.value ? null : { required: true }
      ]
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      validators: [
        (control: any) => control.value && control.value.length >= 10 ? null : { minlength: { requiredLength: 10, actualLength: control.value?.length || 0 } }
      ]
    }
  ];

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

  beforeEach(() => {
    component.fields = mockFields;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the given fields', () => {
    expect(component.form.contains('name')).toBe(true);
    expect(component.form.contains('description')).toBe(true);

    const nameControl = component.getControl('name');
    const descriptionControl = component.getControl('description');

    expect(nameControl).toBeTruthy();
    expect(descriptionControl).toBeTruthy();
  });

  it('should return required error message for a touched required field', () => {
    const nameControl = component.getControl('name');
    nameControl.markAsTouched(); 

    expect(component.getErrorMessage('name')).toBe('This field is required');
  });

  it('should return minlength error message for a field with insufficient length', () => {
    const descriptionControl = component.getControl('description');
    descriptionControl.setValue('short');
    descriptionControl.markAsTouched();

    expect(component.getErrorMessage('description')).toBe('This field must be at least 10 characters long');
  });

  it('should not return error message if field is valid', () => {
    const descriptionControl = component.getControl('description');
    descriptionControl.setValue('This is a valid description');
    descriptionControl.markAsTouched();

    expect(component.getErrorMessage('description')).toBe('');
  });

  it('should emit form value and reset the form on valid form submission', () => {
    jest.spyOn(component.onSubmit, 'emit');
    const nameControl = component.getControl('name');
    const descriptionControl = component.getControl('description');

    nameControl.setValue('Test Name');
    descriptionControl.setValue('This is a valid description');

    component.submitForm();

    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      name: 'Test Name',
      description: 'This is a valid description',
    });
    expect(component.form.pristine).toBe(true);
  });

  it('should not emit form value if form is invalid', () => {
    jest.spyOn(component.onSubmit, 'emit');

    component.submitForm(); 

    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });
});
