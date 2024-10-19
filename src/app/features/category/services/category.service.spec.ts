import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Pagination } from 'src/app/domain/models/Pagination';
import { Sorting } from 'src/app/domain/models/Sorting';
import { Paginated } from 'src/app/domain/models/Paginated';
import { Category, CreateCategoryRequestDTO } from 'src/app/domain/models/Category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should get categories with pagination and sorting', () => {
    const pagination: Pagination = { page: 1, size: 10 };
    const sorting: Sorting = { sortBy: 'name', direction: 'asc' };
    const mockCategories: Paginated<Category> = {
      data: [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' },
      ],
      currentPage: 1,
      totalItems: 2,
      totalPages: 1
    };

    service.getCategories(pagination, sorting).subscribe((response) => {
      expect(response).toEqual(mockCategories);
    });

    const req = httpMock.expectOne((request) => request.method === 'GET' && request.url === `${service['apiURL']}`);
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');
    expect(req.request.params.get('sortBy')).toEqual('name');
    expect(req.request.params.get('direction')).toEqual('ASC');
    req.flush(mockCategories);
  });

  it('should create a category', () => {
    const newCategory: CreateCategoryRequestDTO = {
      name: 'New Category',
      description: 'New Description',
    };

    const createdCategory: Category = { id: 3, name: 'New Category', description: 'New Description' };

    service.createCategory(newCategory).subscribe((response) => {
      expect(response).toEqual(createdCategory);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCategory);
    req.flush(createdCategory); 
  });

  it('should notify category creation', () => {
    const spy = jest.spyOn(service['categoryCreatedSource'], 'next'); 
  
    service.notifyCategoryCreated(); 
  
    expect(spy).toHaveBeenCalled();  
    spy.mockRestore();  
  });
});
