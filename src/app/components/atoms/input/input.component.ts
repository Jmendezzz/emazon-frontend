import { Component, inject, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
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
  @Input() variant : InputVariant = 'default';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';

  constructor() {}

  value: string = '';
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
  }
}
