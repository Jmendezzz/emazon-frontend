import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: NgControl,
          useValue: {
            control: {
              valueAccessor: {
                registerOnChange: () => {},
                registerOnTouched: () => {},
              },
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the input component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as "default"', () => {
    expect(component.variant).toBe('default');
  });

  it('should have default type as "text"', () => {
    expect(component.type).toBe('text');
  });

  it('should have default placeholder as an empty string', () => {
    expect(component.placeholder).toBe('');
  });

  it('should write value using writeValue method', () => {
    component.writeValue('Test value');
    expect(component.value).toBe('Test value');
  });

  it('should register onChange and call when input is changed', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'New input value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(onChangeSpy).toHaveBeenCalledWith('New input value');
  });

  it('should register onTouched', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);

    component.onTouched();
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should call onInput and trigger onChange', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    const inputEvent = new Event('input');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'User input';

    inputElement.dispatchEvent(inputEvent);
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('User input');
  });

  it('should render the correct input attributes', () => {
    component.placeholder = 'Enter text';
    component.type = 'email';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Enter text');
    expect(inputElement.type).toBe('email');
  });
  describe('onInputChange', () => {
    beforeEach(() => {
      // Mock the onChange function
      component.onChange = jest.fn();
    });

    it('should exit without changes if type is not "number"', () => {
      component.type = 'text';
      const event = { target: { value: '123' } } as unknown as Event;

      component.onInputChange(event);

      expect(component.onChange).not.toHaveBeenCalled();
    });

    it('should set value and call onChange with null if input value is empty', () => {
      component.type = 'number';
      const event = { target: { value: '' } } as unknown as Event;

      component.onInputChange(event);

      expect(component.value).toBe('');
      expect(component.lastValidNumber).toBeNull();
      expect(component.onChange).toHaveBeenCalledWith(null);
    });

    it('should update value, lastValidNumber and call onChange with the number if value is numeric', () => {
      component.type = 'number';
      const event = { target: { value: '456' } } as unknown as Event;

      component.onInputChange(event);

      expect(component.value).toBe('456');
      expect(component.lastValidNumber).toBe(456);
      expect(component.onChange).toHaveBeenCalledWith(456);
    });

    it('should revert to lastValidNumber and stop propagation if value is not numeric', () => {
      component.type = 'number';
      component.lastValidNumber = 123;
      const event = {
        target: { value: 'abc' },
        stopPropagation: jest.fn()
      } as unknown as Event;

      component.onInputChange(event);

      expect(component.value).toBe('123');
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.onChange).toHaveBeenCalledWith(123);
    });

    it('should set value as empty and call onChange with null if there is no lastValidNumber', () => {
      component.type = 'number';
      component.lastValidNumber = null;
      const event = {
        target: { value: 'xyz' },
        stopPropagation: jest.fn()
      } as unknown as Event;

      component.onInputChange(event);

      expect(component.value).toBe('');
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.onChange).toHaveBeenCalledWith(null);
    });
  });

});
