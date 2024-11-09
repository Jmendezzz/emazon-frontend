import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { WarehousesTableComponent } from './warehouses-table.component';
import { UserService } from '../../services/user.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { delay, of, throwError } from 'rxjs';
import { USERS_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Paginated } from '@/domain/models/Paginated';
import { User } from '@/domain/models/User';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WarehousesTableComponent', () => {
  let component: WarehousesTableComponent;
  let fixture: ComponentFixture<WarehousesTableComponent>;
  let userServiceMock: any;
  let paginationServiceMock: any;

  const mockPaginatedWarehouses: Paginated<User> = {
    data: [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    ],
    totalItems: 2,
    currentPage: 1,
    totalPages: 1,
  };

  beforeEach(async () => {
    userServiceMock = {
      getWarehouses: jest.fn(),
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
      declarations: [WarehousesTableComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: PaginationService, useValue: paginationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(WarehousesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.headers).toEqual(USERS_TABLE_HEADERS);
    expect(component.warehouses).toBeUndefined();
    expect(component.isLoading).toBe(false);
  });

  describe('loadWarehouses', () => {
    it('should load warehouses and set isLoading to false on success', fakeAsync(() => {
      const mockPagination = {
        pagination: { page: 1, size: 10 },
        sorting: { sortBy: 'name', direction: 'asc' },
      };

      paginationServiceMock.getPaginationParams.mockReturnValue(
        of(mockPagination)
      );
      userServiceMock.getWarehouses.mockReturnValue(
        of(mockPaginatedWarehouses).pipe(delay(1000))
      );

      component.loadWarehouses();
      expect(component.isLoading).toBe(true);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.warehouses).toEqual(mockPaginatedWarehouses);
    }));

    it('should handle error and set isLoading to false', fakeAsync(() => {
      paginationServiceMock.getPaginationParams.mockReturnValue(
        of({
          pagination: { page: 1, size: 10 },
          sorting: { sortBy: 'name', direction: 'asc' },
        }).pipe(delay(500))
      );

      userServiceMock.getWarehouses.mockReturnValue(
        throwError(() => new Error('Failed to load warehouses')).pipe(delay(1000))
      );

      component.loadWarehouses();

      expect(component.isLoading).toBe(true);

      tick(500);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.warehouses).toBeUndefined();
    }));
  });

  describe('ngOnInit', () => {
    it('should call loadWarehouses on init', () => {
      const loadWarehousesSpy = jest.spyOn(component, 'loadWarehouses');

      component.ngOnInit();

      expect(loadWarehousesSpy).toHaveBeenCalled();
    });
  });

  describe('formatWarehouses', () => {
    it('should format the warehouses data correctly', () => {
      const formattedWarehouses = component.formatWarehouses(mockPaginatedWarehouses);

      expect(formattedWarehouses).toEqual({
        ...mockPaginatedWarehouses,
        data: [
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
          { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
        ],
      });
    });
  });
});
