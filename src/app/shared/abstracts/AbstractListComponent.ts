import { Paginated } from '@/domain/models/Paginated';
import { Directive } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { PaginationService } from '../services/ui/pagination.service';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';

@Directive()
export abstract class AbstractListComponent<T> {
  items: Paginated<T> | undefined = undefined;
  isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly paginationService: PaginationService) {}

  abstract getItems(
    pagination: Pagination,
    sorting: Sorting
  ): Observable<Paginated<T>>;

  ngOnInit() {
    this.loadItems();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadItems() {
    this.isLoading = true;
    this.paginationService
      .getPaginationParams()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(({ pagination, sorting }) => {
          return this.getItems(pagination, sorting);
        })
      )
      .subscribe({
        next: (items) => {
          this.items = items;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  refresh() {
    this.ngOnDestroy();
    this.loadItems();
  }
}
