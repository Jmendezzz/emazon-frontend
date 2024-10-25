import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DropdownOption } from './dropdown-types';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = '';
  @Input() maxSelectedOptions: number = 1;

  selectedOptions: DropdownOption[] = [];
  filteredOptions: DropdownOption[] = [];
  dropdownOpened: boolean = false;

  constructor() { }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  selectOption(option: DropdownOption): void {
    if (this.selectedOptions.length < this.maxSelectedOptions) {
      this.selectedOptions.push(option);
    }
  }

}
