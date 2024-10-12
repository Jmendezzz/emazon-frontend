import { Component, Input, OnInit } from '@angular/core';
import { Size } from 'src/app/shared/types/common-types';
import { ButtonVariant } from './button-types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() size: Size = 'md';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
