import { TestBed } from '@angular/core/testing';
import { PaginationService } from './pagination.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Pagination } from 'src/app/domain/models/Pagination';
import { Sorting } from 'src/app/domain/models/Sorting';

describe('PaginationService', () => {
  let service: PaginationService;
  let activatedRouteMock: any;

  beforeEach(() => {
    activatedRouteMock = {
      queryParamMap: of({
        get: (key: string) => {
          const params: { [key: string]: string | null } = {
            page: '1',
            size: '10',
            sortBy: 'name',
            direction: 'asc',
          };
          return params[key] ?? null;
        },
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        PaginationService,
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    });

    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPaginationParams', () => {
    it('should return pagination and sorting params from query parameters', (done) => {
      const expectedPagination: Pagination = { page: '1', size: '10' };
      const expectedSorting: Sorting = { sortBy: 'name', direction: 'asc' };

      service.getPaginationParams().subscribe(({ pagination, sorting }) => {
        expect(pagination).toEqual(expectedPagination);
        expect(sorting).toEqual(expectedSorting);
        done();
      });
    });

    it('should handle missing query parameters by returning null values', (done) => {
      activatedRouteMock.queryParamMap = of({
        get: (key: string) => null,
      });

      const expectedPagination: Pagination = { page: null, size: null };
      const expectedSorting: Sorting = { sortBy: null, direction: null };

      service.getPaginationParams().subscribe(({ pagination, sorting }) => {
        expect(pagination).toEqual(expectedPagination);
        expect(sorting).toEqual(expectedSorting);
        done();
      });
    });
  });
});
