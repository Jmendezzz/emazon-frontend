import { Category } from '@/domain/models/Category';
import { Paginated } from '@/domain/models/Paginated';
import { TableHeader } from '@/domain/models/TableHeader';
import { CATEGORY_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { CategoryService } from '@/features/category/services/category.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit, OnDestroy{
  headers: TableHeader[] = CATEGORY_TABLE_HEADERS;
  categories: Paginated<Category> | undefined = undefined;
  isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly categoryService: CategoryService,
    private readonly paginationService: PaginationService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.onCategoryCreated();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories(){
    this.isLoading = true;
    this.paginationService.getPaginationParams()
    .pipe(takeUntil(this.destroy$))
    .subscribe(({ pagination, sorting }) => {
      this.categoryService.getCategories(pagination, sorting)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
