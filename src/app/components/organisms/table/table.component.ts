import { TableAction } from '@/domain/models/Table';
import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Paginated } from 'src/app/domain/models/Paginated';
import { TableHeader } from 'src/app/domain/models/TableHeader';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends object> {
  @Input() headers: TableHeader[] = [];
  @Input() data: Paginated<T> | undefined = undefined;
  @Input() isLoading: boolean = false;
  @Input() isPaginated: boolean = true;
  @Input() actions?: TableAction<T>[] = [];

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  onSort(header: TableHeader, direction: string) {
    if (header.sortable) {
      this.ngZone.run(() => {
        this.router.navigate([], {
          queryParams: { sortBy: header.key, direction },
          queryParamsHandling: 'merge',
        });
      });
    }
  }
  getKeys(item: T): (keyof T)[] {
    return Object.keys(item) as (keyof T)[];
  }
}
