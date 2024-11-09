import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Pagination } from '@/domain/models/Pagination';
import { Paginated } from '@/domain/models/Paginated';
import { User, CreateUserRequestDTO } from '@/domain/models/User';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get warehouses with pagination', () => {
    const pagination: Pagination = { page: 1, size: 10 };
    const mockWarehouses: Paginated<User> = {
      data: [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
      ],
      currentPage: 1,
      totalItems: 2,
      totalPages: 1
    };

    service.getWarehouses(pagination).subscribe((response) => {
      expect(response).toEqual(mockWarehouses);
    });

    const req = httpMock.expectOne((request) => request.method === 'GET' && request.url === `${service['apiURL']}/warehouse-assistants`);
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');
    req.flush(mockWarehouses);
  });

  it('should create a warehouse assistant', () => {
    const newUser: CreateUserRequestDTO = {
      firstName: 'New',
      lastName: 'User',
      identityNumber: 123456789,
      phoneNumber: '123-456-7890',
      birthDate: new Date('2000-01-01'),
      email: 'newuser@example.com',
      password: 'passworD123_',
    };

    const createdUser: User = { id: 3, firstName: 'New', lastName: 'User', email: 'newuser@example.com' };

    service.createWarehouseAssistant(newUser).subscribe((response) => {
      expect(response).toEqual(createdUser);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/create/warehouse-assistant`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });
});