import { Category } from '@/domain/models/Category';
import { Paginated } from '@/domain/models/Paginated';
import { TableHeader } from '@/domain/models/TableHeader';
import { CATEGORY_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { CategoryService } from '@/features/category/services/category.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { Component, OnInit } from '@angular/core';


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
