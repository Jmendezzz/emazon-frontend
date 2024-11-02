import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { DropdownOption } from './dropdown-types';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: '<input (input)="onInput($event)" />',
})
class MockInputComponent {
  @Input() placeholder: string = '';
  onInput(event: any) {
    this.valueChange(event.target.value);
  }
  valueChange = jest.fn();
}

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let element: HTMLElement;

  const options: DropdownOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent, MockInputComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: NgControl,
          useValue: {
            valueAccessor: {
              writeValue: jest.fn(),
              registerOnChange: jest.fn(),
              registerOnTouched: jest.fn(),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.options = options;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filteredOptions with input options on init', () => {
    component.ngOnInit();
    expect(component.filteredOptions).toEqual(options);
  });

  it('should register onChange function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.onChange('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('should toggle the dropdown', () => {
    expect(component.dropdownOpened).toBe(false);
    component.toggleDropdown();
    expect(component.dropdownOpened).toBe(true);
  });

  it('should close dropdown on toggle if already open', () => {
    component.dropdownOpened = true;
    component.toggleDropdown();
    expect(component.dropdownOpened).toBe(false);
  });

  it('should select an option', () => {
    component.selectOption(options[0]);
    expect(component.selectedOptions).toContain(options[0]);
  });

  it('should deselect an option if already selected', () => {
    component.selectedOptions = [options[0]];
    component.selectOption(options[0]);
    expect(component.selectedOptions).not.toContain(options[0]);
  });

  it('should limit selections based on maxSelectedOptions', () => {
    component.maxSelectedOptions = 2;
    component.selectOption(options[0]);
    component.selectOption(options[1]);
    component.selectOption(options[2]);
    expect(component.selectedOptions.length).toBe(2);
  });

  it('should call onChange with selected values', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    component.selectOption(options[0]);
    expect(onChangeSpy).toHaveBeenCalledWith(options[0].value);
  });

  it('should filter options based on search term', () => {
    component.onSearch('2');
    expect(component.filteredOptions).toEqual([options[1]]);
  });

  it('should reset filteredOptions to options when search term is empty', () => {
    component.onSearch('');
    expect(component.filteredOptions).toEqual(options);
  });

  it('should return a comma-separated label of selected options', () => {
    component.selectedOptions = [options[0], options[1]];
    expect(component.getSelectedOptionsLabel()).toBe('Option 1, Option 2');
  });

  it('should clear selectedOptions and filteredOptions on destroy', () => {
    component.ngOnDestroy();
    expect(component.selectedOptions).toEqual([]);
    expect(component.filteredOptions).toEqual([]);
    expect(component.dropdownOpened).toBe(false);
  });

  it('should display the placeholder when no options are selected', () => {
    component.placeholder = 'Select an option';
    fixture.detectChanges();
    const placeholder = element.querySelector('.dropdown__placeholder');
    expect(placeholder?.textContent).toContain('Select an option');
  });

  it('should display selected options label when options are selected', () => {
    component.selectedOptions = [options[0], options[1]];
    fixture.detectChanges();
    const label = element.querySelector('.dropdown__label');
    expect(label?.textContent).toContain('Option 1, Option 2');
  });
});