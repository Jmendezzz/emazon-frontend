import { Component, Input, OnInit } from '@angular/core';
import { InputType } from 'zlib';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
