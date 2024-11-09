import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDateComponent } from './input-date.component';
import { NgControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateComponent],
      providers: [
        {
          provide: NgControl,
          useValue: {
            valueAccessor: null,
            control: {
              setValue: jest.fn(),
              markAsTouched: jest.fn(),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.value).toBe('');
    expect(component.variant).toBe('default');
    expect(component.placeholder).toBe('');
    expect(component.valueChange).toBeInstanceOf(EventEmitter);
  });

  it('should write value using writeValue method', () => {
    component.writeValue('2023-01-01');
    expect(component.value).toBe('2023-01-01');
  });

  it('should register onChange function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });

  it('should call onChange and emit valueChange when onInput is triggered', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const emitSpy = jest.spyOn(component.valueChange, 'emit');

    const event = { target: { value: '2023-02-02' } } as unknown as Event;
    component.onInput(event);

    expect(onChangeSpy).toHaveBeenCalledWith('2023-02-02');
    expect(emitSpy).toHaveBeenCalledWith('2023-02-02');
    expect(component.value).toBe('2023-02-02');
  });

});
