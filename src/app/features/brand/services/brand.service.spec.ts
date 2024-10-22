import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from '@/features/brand/services/brand.service';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { Paginated } from '@/domain/models/Paginated';
import { Brand, CreateBrandRequestDTO } from '@/domain/models/Brand';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get brands with pagination and sorting', () => {
    const pagination: Pagination = { page: 1, size: 10 };
    const sorting: Sorting = { sortBy: 'name', direction: 'asc' };
    const mockBrands: Paginated<Brand> = {
      data: [
        { id: 1, name: 'Brand 1', description: 'Description 1' },
        { id: 2, name: 'Brand 2', description: 'Description 2' },
      ],
      currentPage: 1,
      totalItems: 2,
      totalPages: 1
    };

    service.getBrands(pagination, sorting).subscribe((response) => {
      expect(response).toEqual(mockBrands);
    });

    const req = httpMock.expectOne((request) => request.method === 'GET' && request.url === `${service['apiURL']}`);
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');
    expect(req.request.params.get('sortBy')).toEqual('name');
    expect(req.request.params.get('direction')).toEqual('ASC');
    req.flush(mockBrands);
  });

  it('should create a brand', () => {
    const newBrand: CreateBrandRequestDTO = {
      name: 'New Brand',
      description: 'New Description',
    };

    const createdBrand: Brand = { id: 3, name: 'New Brand', description: 'New Description' };

    service.createBrand(newBrand).subscribe((response) => {
      expect(response).toEqual(createdBrand);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newBrand);
    req.flush(createdBrand);
  });

  it('should notify brand creation', () => {
    const spy = jest.spyOn(service['brandCreatedSource'], 'next');

    service.notifyBrandCreated();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});