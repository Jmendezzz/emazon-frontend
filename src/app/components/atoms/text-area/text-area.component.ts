import { Component, inject, Input} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { InputVariant } from '../input/input-types';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements ControlValueAccessor{
  public ngControl: NgControl = Object.assign(inject(NgControl), {
    valueAccessor: this,
  });
  @Input() variant : InputVariant = 'default';
  @Input() placeholder: string = '';
  @Input() rows: number = 4;
  @Input() maxLength: number = 1000;

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
    const value = (event.target as HTMLTextAreaElement).value;
    this.onChange(value); 
  }

}
