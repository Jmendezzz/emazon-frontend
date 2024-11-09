import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { InputVariant } from '../input/input-types';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent implements ControlValueAccessor {
  public ngControl: NgControl = Object.assign(inject(NgControl), {
    valueAccessor: this,
  });

  @Input() value: string = '';
  @Input() variant: InputVariant = 'default';
  @Input() placeholder: string = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

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

    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
}