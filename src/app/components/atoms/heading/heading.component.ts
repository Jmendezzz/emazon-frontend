import { Component, OnInit } from '@angular/core';
import { HeadingType } from './heading-types';
import { Size } from 'src/app/shared/types/common-types';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  type: HeadingType = 'h3';
  size: Size = 'md';
  constructor() { }

  ngOnInit(): void {
  }

}
