import { Component, OnInit } from '@angular/core';
import { CATEGORY_TABLE_HEADERS } from 'src/app/domain/utils/constants/TableHeaders';
import { Category } from 'src/app/domain/models/Category';
import { TableHeader } from 'src/app/domain/models/TableHeader';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  headers: TableHeader[] = CATEGORY_TABLE_HEADERS;
  data: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Category 2',
      description: 'Description 2',
    },
    {
      id: 3,
      name: 'Category 3',
      description: 'Description 3',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
