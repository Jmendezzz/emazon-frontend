import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { Injectable } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private readonly paginationParams$: Observable<{ pagination: Pagination; sorting: Sorting }>;

  constructor(private readonly route: ActivatedRoute) {
    this.paginationParams$ = this.route.queryParamMap.pipe(
      map((params) => {
        const page = params.get('page'),
          size = params.get('size'),
          sortBy = params.get('sortBy'),
          direction = params.get('direction');
        return {
          pagination: {
            page,
            size,
          },
          sorting: {
            sortBy,
            direction,
          },
        };
      }),
      shareReplay(1) // Shares the latest result with all subscribers
    );
  }

  getPaginationParams(): Observable<{
    pagination: Pagination;
    sorting: Sorting;
  }> {
    return this.paginationParams$;
  }
}