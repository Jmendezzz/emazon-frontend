import { Component, Input } from '@angular/core';
import { InputType, InputVariant } from '../../atoms/input/input-types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-form-row',
  templateUrl: './input-form-row.component.html',
  styleUrls: ['./input-form-row.component.scss'],
})
export class InputFormRowComponent {
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() control!: FormControl;
  constructor() {}

  getInputVariant(): InputVariant {
    if (this.control.invalid && this.control.touched) {
      return 'error';
    }
    return 'default';
  }
}
