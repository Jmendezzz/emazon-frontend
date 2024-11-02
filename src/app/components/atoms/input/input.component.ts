import { Component, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { InputType } from 'zlib';
import { InputVariant } from './input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  public ngControl: NgControl = Object.assign(inject(NgControl), {
    valueAccessor: this,
  });
  @Input() value: string = '';
  @Input() variant : InputVariant = 'default';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';

  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();

  lastValidNumber: number | null = null;
  
  constructor() {}

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value); 
    this.valueChange.emit(value);
  }
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    if (this.type !== 'number') return;

    const input = event.target as HTMLInputElement;
    const value = input.value;

    if(!value) {
      this.value = '';
      this.lastValidNumber = null;
      this.onChange(null);
      return;
    }

    if (/^\d+$/.test(value)) {
      const numericValue = parseInt(value, 10);
      this.value = value;
      this.lastValidNumber = numericValue;
      this.onChange(numericValue);
    } else {
      this.value = this.lastValidNumber?.toString() ?? '';
      this.onChange(this.lastValidNumber);
      event.stopPropagation();
      input.value = this.lastValidNumber ? this.lastValidNumber.toString() : '';
    }
  }
}
