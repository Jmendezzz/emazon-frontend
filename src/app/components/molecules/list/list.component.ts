import { Paginated } from '@/domain/models/Paginated';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent<T> {
  @Input() items: Paginated<T> | undefined = undefined;
  @Input() isLoading: boolean = false;
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() direction: 'row' | 'column' = 'row';
  
  constructor() { }

}
