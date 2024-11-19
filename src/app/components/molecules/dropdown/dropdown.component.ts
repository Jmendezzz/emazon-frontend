import { Component, forwardRef, Input, OnDestroy, OnInit, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownOption } from './dropdown-types';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent
  implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() options: DropdownOption[] | undefined = [];
  @Input() placeholder: string = '';
  @Input() maxSelectedOptions: number = 1;

  selectedOptions: DropdownOption[] = [];
  filteredOptions: DropdownOption[] = [];
  dropdownOpened: boolean = false;
  dropdownAbove: boolean = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredOptions = this.options || [];
  }

  writeValue(value: any): void {
    this.filteredOptions = value;
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
    this.filteredOptions = this.options || [];
    this.calculateDropdownPosition();
    this.onTouched();
  }

  selectOption(option: DropdownOption): void {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter((o) => o !== option);
    } else if (this.selectedOptions.length < this.maxSelectedOptions) {
      this.selectedOptions.push(option);
    }
    const value =
      this.maxSelectedOptions == 1
        ? this.selectedOptions.map((o) => o.value)[0]
        : this.selectedOptions.map((o) => o.value);
    this.onChange(value);
  }

  onSearch(searchTerm: string | number): void {
    const searchTermString = searchTerm.toString().toLowerCase();
    if (this.options) {
      this.filteredOptions = this.options.filter((option) =>
        option.label.toLowerCase().includes(searchTermString)
      );
    }
  }

  ngOnDestroy(): void {
    this.filteredOptions = [];
    this.selectedOptions = [];
    this.dropdownOpened = false;
  }

  getSelectedOptionsLabel(): string {
    return this.selectedOptions.map((o) => o.label).join(', ');
  }

  calculateDropdownPosition(): void {
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement) {
      const rect = dropdownElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      this.dropdownAbove = spaceBelow < 280;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpened = false;
    }
  }
}
