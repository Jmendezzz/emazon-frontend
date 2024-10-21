import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CategoryTableComponent } from './category-table.component';
import { CategoryService } from '@/features/category/services/category.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { delay, of, throwError } from 'rxjs';
import { CATEGORY_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Paginated } from '@/domain/models/Paginated';
import { Category } from '@/domain/models/Category';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoryTableComponent', () => {
  let component: CategoryTableComponent;
  let fixture: ComponentFixture<CategoryTableComponent>;
  let categoryServiceMock: any;
  let paginationServiceMock: any;

  const mockPaginatedCategories: Paginated<Category> = {
    data: [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: 'Description 2' },
    ],
    totalItems: 2,
    currentPage: 1,
    totalPages: 10,
  };

  beforeEach(async () => {
    categoryServiceMock = {
      getCategories: jest.fn(),
      onCategoryCreated$: of(),
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
      declarations: [CategoryTableComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: PaginationService, useValue: paginationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.headers).toEqual(CATEGORY_TABLE_HEADERS);
    expect(component.categories).toBeUndefined();
    expect(component.isLoading).toBe(false);
  });

  describe('loadCategories', () => {
    it('should load categories and set isLoading to false on success', fakeAsync(() => {
      const mockPagination = {
        pagination: { page: 1, size: 10 },
        sorting: { sortBy: 'name', direction: 'asc' },
      };

      paginationServiceMock.getPaginationParams.mockReturnValue(
        of(mockPagination)
      );
      categoryServiceMock.getCategories.mockReturnValue(
        of(mockPaginatedCategories).pipe(delay(1000))
      );

      component.loadCategories();
      expect(component.isLoading).toBe(true);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.categories).toEqual(mockPaginatedCategories);
    }));
    it('should handle error and set isLoading to false', fakeAsync(() => {
      paginationServiceMock.getPaginationParams.mockReturnValue(
        of({
          pagination: { page: 1, size: 10 },
          sorting: { sortBy: 'name', direction: 'asc' },
        }).pipe(delay(500)) 
      );
    
      categoryServiceMock.getCategories.mockReturnValue(
        throwError(() => new Error('Failed to load categories')).pipe(delay(1000))
      );
    
      component.loadCategories();
    
      expect(component.isLoading).toBe(true);
    
      tick(500); 
    
      tick(1000);
    
      expect(component.isLoading).toBe(false);
      expect(component.categories).toBeUndefined();
    }));

    describe('onCategoryCreated', () => {
      it('should reload categories when a new category is created', () => {
        const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');

        categoryServiceMock.onCategoryCreated$ = of();

        component.ngOnInit();

        expect(loadCategoriesSpy).toHaveBeenCalled();
      });
    });

    describe('ngOnInit', () => {
      it('should call loadCategories and onCategoryCreated', () => {
        const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');
        const onCategoryCreatedSpy = jest.spyOn(component, 'onCategoryCreated');

        component.ngOnInit();

        expect(loadCategoriesSpy).toHaveBeenCalled();
        expect(onCategoryCreatedSpy).toHaveBeenCalled();
      });
    });

  });

});
