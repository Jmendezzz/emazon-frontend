import { Component, OnInit } from '@angular/core';
import { CATEGORY_TABLE_HEADERS } from 'src/app/domain/utils/constants/TableHeaders';
import { Category } from 'src/app/domain/models/Category';
import { TableHeader } from 'src/app/domain/models/TableHeader';
import { Paginated } from 'src/app/domain/models/Paginated';
import { CategoryService } from 'src/app/shared/services/api/category.service';
import { PaginationService } from 'src/app/shared/services/ui/pagination.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  headers: TableHeader[] = CATEGORY_TABLE_HEADERS;
  categories: Paginated<Category> | undefined = undefined;
  isLoading: boolean = false;


  constructor(private readonly categoryService: CategoryService,
    private readonly paginationService: PaginationService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.onCategoryCreated();
  }

  loadCategories(){
    this.isLoading = true;
    this.paginationService.getPaginationParams().subscribe(({ pagination, sorting }) => {
      this.categoryService.getCategories(pagination, sorting).subscribe({
        next: (categories) => {
          this.categories = categories;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    });
  }

  onCategoryCreated() {
    this.categoryService.onCategoryCreated$.subscribe(() => {
      this.loadCategories();
    });
  }
}
