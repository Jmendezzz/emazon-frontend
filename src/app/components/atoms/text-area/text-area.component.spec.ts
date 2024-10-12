import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: NgControl,
          useValue: {
            control: {
              setValidators: jest.fn(),
            },
            valueAccessor: {
              writeValue: jest.fn(),
              registerOnChange: jest.fn(),
              registerOnTouched: jest.fn(),
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default @Input() values', () => {
    expect(component.variant).toBe('default');
    expect(component.placeholder).toBe('');
    expect(component.rows).toBe(4);
    expect(component.maxLength).toBe(1000);
  });

  it('should update value on writeValue call', () => {
    const newValue = 'test value';
    component.writeValue(newValue);
    expect(component.value).toBe(newValue);
  });

  it('should register onChange function', () => {
    const onChangeFn = jest.fn();
    component.registerOnChange(onChangeFn);
    component.onChange('test');
    expect(onChangeFn).toHaveBeenCalledWith('test');
  });

  it('should register onTouched function', () => {
    const onTouchedFn = jest.fn();
    component.registerOnTouched(onTouchedFn);
    component.onTouched();
    expect(onTouchedFn).toHaveBeenCalled();
  });

  it('should call onChange when onInput is triggered', () => {
    const inputEvent = new Event('input');
    const textAreaElement = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    const onChangeFn = jest.fn();

    component.registerOnChange(onChangeFn);
    textAreaElement.value = 'new text';
    textAreaElement.dispatchEvent(inputEvent);

    expect(onChangeFn).toHaveBeenCalledWith('new text');
  });
});
