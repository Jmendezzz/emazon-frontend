import { Component, Input, OnInit } from '@angular/core';
import { InputType } from '../../atoms/input/input-types';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-form-row',
  templateUrl: './input-form-row.component.html',
  styleUrls: ['./input-form-row.component.scss']
})
export class InputFormRowComponent implements OnInit {
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() control!: FormControl;
  constructor() { }

  ngOnInit(): void {
  }

}
