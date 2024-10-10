import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() rows: number = 4;
  @Input() maxLength: number = 1000;

  constructor() { }

  ngOnInit(): void {
  }

}
