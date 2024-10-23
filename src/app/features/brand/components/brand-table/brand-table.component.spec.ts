import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrandTableComponent } from './brand-table.component';
import { BrandService } from '@/features/brand/services/brand.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { delay, of, throwError } from 'rxjs';
import { BRAND_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Paginated } from '@/domain/models/Paginated';
import { Brand } from '@/domain/models/Brand';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BrandTableComponent', () => {
  let component: BrandTableComponent;
  let fixture: ComponentFixture<BrandTableComponent>;
  let brandServiceMock: any;
  let paginationServiceMock: any;

  const mockPaginatedBrands: Paginated<Brand> = {
    data: [
      { id: 1, name: 'Brand 1', description: 'Description 1' },
      { id: 2, name: 'Brand 2', description: 'Description 2' },
    ],
    totalItems: 2,
    currentPage: 10,
    totalPages: 1,
  };

  beforeEach(async () => {
    brandServiceMock = {
      getBrands: jest.fn(),
      onBrandCreated$: of(), 
    };

    paginationServiceMock = {
      getPaginationParams: jest.fn().mockReturnValue(
        of({
          pagination: { page: 1, size: 10 },
          sorting: { sortBy: 'name', direction: 'asc' },
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [BrandTableComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        { provide: PaginationService, useValue: paginationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(BrandTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.headers).toEqual(BRAND_TABLE_HEADERS);
    expect(component.brands).toBeUndefined();
    expect(component.isLoading).toBe(false);
  });

  describe('loadBrands', () => {
    it('should load brands and set isLoading to false on success', fakeAsync(() => {
      const mockPagination = {
        pagination: { page: 1, size: 10 },
        sorting: { sortBy: 'name', direction: 'asc' },
      };

      paginationServiceMock.getPaginationParams.mockReturnValue(
        of(mockPagination)
      );
      brandServiceMock.getBrands.mockReturnValue(
        of(mockPaginatedBrands).pipe(delay(1000))
      );

      component.loadBrands();
      expect(component.isLoading).toBe(true);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.brands).toEqual(mockPaginatedBrands);
    }));

    it('should handle error and set isLoading to false', fakeAsync(() => {
      paginationServiceMock.getPaginationParams.mockReturnValue(
        of({
          pagination: { page: 1, size: 10 },
          sorting: { sortBy: 'name', direction: 'asc' },
        }).pipe(delay(500))
      );

      brandServiceMock.getBrands.mockReturnValue(
        throwError(() => new Error('Failed to load brands')).pipe(delay(1000))
      );

      component.loadBrands();

      expect(component.isLoading).toBe(true);

      tick(500);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.brands).toBeUndefined();
    }));
  });

  describe('onBrandCreated', () => {
    it('should reload brands when a new brand is created', () => {
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands');

      brandServiceMock.onBrandCreated$ = of();

      component.ngOnInit();

      expect(loadBrandsSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should call loadBrands and onBrandCreated', () => {
      const loadBrandsSpy = jest.spyOn(component, 'loadBrands');
      const onBrandCreatedSpy = jest.spyOn(component, 'onBrandCreated');

      component.ngOnInit();

      expect(loadBrandsSpy).toHaveBeenCalled();
      expect(onBrandCreatedSpy).toHaveBeenCalled();
    });
  });
});
