import { Component, Input, OnInit } from '@angular/core';
import { HeadingType } from './heading-types';
import { Size } from 'src/app/shared/types/common-types';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() type: HeadingType = 'h3';
  @Input() size: Size = 'md';
  @Input() text: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  getHeadingClass(): string {
    return `heading heading--${this.size}`;
  }

}
