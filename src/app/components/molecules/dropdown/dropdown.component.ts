import { Component, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DropdownOption } from './dropdown-types';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  public ngControl: NgControl = Object.assign(inject(NgControl), {
    valueAccessor: this,
  });

  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = '';
  @Input() maxSelectedOptions: number = 1;

  selectedOptions: DropdownOption[] = [];
  filteredOptions: DropdownOption[] = [];
  dropdownOpened: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedOptions = value;
    } else {
      this.selectedOptions = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  toggleDropdown(): void {
    this.dropdownOpened = !this.dropdownOpened;
  }

  selectOption(option: DropdownOption): void {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter((o) => o !== option);
    } else if (this.selectedOptions.length < this.maxSelectedOptions) {
      this.selectedOptions.push(option);
    }
    this.onChange(this.selectedOptions);
  }

  onSearch(searchTerm: string | number): void {
    const searchTermString = searchTerm.toString().toLowerCase();

    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(searchTermString)
    );
  }
}
