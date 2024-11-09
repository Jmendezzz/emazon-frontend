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
  @Input() prefix?: string;

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
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    this.value = this.addPrefix(value);
    this.onChange(this.value);
    this.valueChange.emit(value);
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    if (this.type !== 'number') return;

    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = this.removePrefix(value);

    if (!value) {
      this.value = this.prefix ?? '';
      this.lastValidNumber = null;
      this.onChange(null);
      return;
    }

    if (/^\d+$/.test(value)) {
      const numericValue = parseInt(value, 10);
      this.value = this.addPrefix(value);
      this.lastValidNumber = numericValue;
      this.onChange(numericValue);
    } else {
      this.value = this.addPrefix(this.lastValidNumber?.toString() ?? '');
      this.onChange(this.lastValidNumber);
      event.stopPropagation();
      input.value = this.value;
    }
  }

  removePrefix(value: string): string {
    if (this.prefix && value.startsWith(this.prefix)) {
      return value.slice(this.prefix.length);
    }
    return value;
  }

  addPrefix(value: string): string {
    if (this.prefix && !value.startsWith(this.prefix)) {
      return this.prefix + value;
    }
    return value;
  }

  getType(): string {
    if(this.type === 'password') {
      return 'password';
    }
    return 'text';
  }
}
