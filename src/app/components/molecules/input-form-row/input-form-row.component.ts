import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-form-row',
  templateUrl: './input-form-row.component.html',
  styleUrls: ['./input-form-row.component.scss']
})
export class InputFormRowComponent implements OnInit {
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
