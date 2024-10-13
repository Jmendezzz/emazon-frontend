import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CategoryTableComponent } from './category-table.component';
import { CategoryService } from 'src/app/shared/services/api/category.service';
import { PaginationService } from 'src/app/shared/services/ui/pagination.service';
import { Paginated } from 'src/app/domain/models/Paginated';
import { Category } from 'src/app/domain/models/Category';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

jest.mock('src/app/shared/services/api/category.service');
jest.mock('src/app/shared/services/ui/pagination.service');

describe('CategoryTableComponent', () => {
  let component: CategoryTableComponent;
  let fixture: ComponentFixture<CategoryTableComponent>;
  let mockCategoryService: jest.Mocked<CategoryService>;
  let mockPaginationService: jest.Mocked<PaginationService>;

  beforeEach(async () => {
    mockCategoryService = new CategoryService({} as HttpClient) as jest.Mocked<CategoryService>;
    mockPaginationService = new PaginationService({} as ActivatedRoute) as jest.Mocked<PaginationService>;

    await TestBed.configureTestingModule({
      declarations: [CategoryTableComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: PaginationService, useValue: mockPaginationService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    const mockCategories: Paginated<Category> = {
      data: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
      totalItems: 1,
      currentPage: 1,
      totalPages: 1
    };

    mockPaginationService.getPaginationParams.mockReturnValue(of({ pagination: { page: 1, size: 10 }, sorting: { sortBy: 'name', direction: 'asc' } }));
    mockCategoryService.getCategories.mockReturnValue(of(mockCategories));
    mockCategoryService.onCategoryCreated$ = of();

    fixture.detectChanges(); 

    expect(mockPaginationService.getPaginationParams).toHaveBeenCalled();
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith({ page: 1, size: 10 }, { sortBy: 'name', direction: 'asc' });
    expect(component.categories).toEqual(mockCategories);
  });

  it('should refresh categories when a new category is created', () => {
    const mockCategories: Paginated<Category> = {
      data: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
      totalItems: 1,
      currentPage: 1,
      totalPages: 1
    };

    mockPaginationService.getPaginationParams.mockReturnValue(of({ pagination: { page: 1, size: 10 }, sorting: { sortBy: 'name', direction: 'asc' } }));
    mockCategoryService.getCategories.mockReturnValue(of(mockCategories));
    mockCategoryService.onCategoryCreated$ = of();

    fixture.detectChanges(); 

    jest.spyOn(mockCategoryService, 'onCategoryCreated$', 'get').mockReturnValue(of(undefined));
    component.onCategoryCreated();

    expect(mockCategoryService.getCategories).toHaveBeenCalledTimes(2); 
  });
  it('should have undefined categories initially', () => {
    expect(component.categories).toBeUndefined();
  });
  it('should handle errors when loading categories', () => {
    const errorMessage = 'Error loading categories';
    
    mockPaginationService.getPaginationParams.mockReturnValue(of({ pagination: { page: 1, size: 10 }, sorting: { sortBy: 'name', direction: 'asc' } }));
    mockCategoryService.getCategories.mockReturnValue(throwError(() => new Error(errorMessage)));
    
    fixture.detectChanges();
    
  });
  it('should subscribe to onCategoryCreated$', () => {
    jest.spyOn(mockCategoryService, 'onCategoryCreated$', 'get').mockReturnValue(of(undefined));
  
    component.ngOnInit();
  
    mockCategoryService.onCategoryCreated$.subscribe(() => {
      expect(mockCategoryService.getCategories).toHaveBeenCalled();
    });
  
    component.onCategoryCreated();
  });
});