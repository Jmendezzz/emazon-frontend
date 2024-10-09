import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/domain/models/TableHeader';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T extends object> implements OnInit {
  @Input() headers: TableHeader[] = [];
  @Input() data: T[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSort(header: TableHeader, direction: string) {
    if (header.sortable) {
      this.router.navigate([], {
        queryParams: { sortBy: header.key, direction },
        queryParamsHandling: 'merge',
      });
    }
  }
  getKeys(item: T): (keyof T)[] {
    return Object.keys(item) as (keyof T)[];
  }

}
