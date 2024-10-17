import { Injectable } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Pagination } from 'src/app/domain/models/Pagination';
import { Sorting } from 'src/app/domain/models/Sorting';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private readonly route: ActivatedRoute) {}

  getPaginationParams(): Observable<{
    pagination: Pagination;
    sorting: Sorting;
  }> {
    return this.route.queryParamMap.pipe(
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
      })
    );
  }
}
