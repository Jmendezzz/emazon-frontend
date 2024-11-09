import { InputType, InputVariant } from '@/components/atoms/input/input-types';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownOption } from '../dropdown/dropdown-types';

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
  @Input() prefix?: string;
  @Input() control!: FormControl;
  @Input() dropdownOptions?: DropdownOption[] = [];
  @Input() maxDropdownSelections?: number;
  @Input() minValue?: number;
  @Input() maxValue?: number;

  constructor() {}

  getInputVariant(): InputVariant {
    if (this.control.invalid && this.control.touched) {
      return 'error';
    }
    return 'default';
  }

  getDropdownOptions(): DropdownOption[] {
    if (!this.dropdownOptions) {
      throw new Error('Dropdown options are required');
    }
    return this.dropdownOptions;
  }

  getDropdownMaxSelections(): number {
    if (!this.maxDropdownSelections) {
      throw new Error('Max dropdown selections are required');
    }
    return this.maxDropdownSelections;
  }
}
