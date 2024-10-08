import { Component, Input, OnInit } from '@angular/core';
import { Header } from './Header';
import { ActivatedRoute, Router } from '@angular/router';
import { SortDirection } from 'src/app/domain/enums/SortDirection';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnInit {
  @Input() headers: Header[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSort(header: Header, direction: string) {
    if (header.sortable) {
      this.router.navigate([], {
        queryParams: { sortBy: header.key, direction },
        queryParamsHandling: 'merge',
      });
    }
  }
}
