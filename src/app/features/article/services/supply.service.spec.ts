import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplyService } from './supply.service';
import { CreateSupplyRequestDTO, SupplyResponseDTO, SupplyStatus } from '@/domain/models/Supply';

describe('SupplyService', () => {
  let service: SupplyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService],
    });

    service = TestBed.inject(SupplyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a supply', () => {
    const newSupply: CreateSupplyRequestDTO = {
      articleId: 1,
      quantity: 100,
      availableAt: new Date('2023-10-01T10:00:00'),
    };

    const createdSupply: SupplyResponseDTO = {
      id: 1,
      articleId: 1,
      quantity: 100,
      availableAt: new Date('2023-10-01T10:00:00'),
      createdAt: new Date('2023-09-01T10:00:00'),
      createdBy: 7,
      status:SupplyStatus.PENDING
    };

    service.createSupply(newSupply).subscribe((response) => {
      expect(response).toEqual(createdSupply);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSupply);
    req.flush(createdSupply);
  });

  it('should notify supply creation', () => {
    const spy = jest.spyOn(service['supplyCreatedSource'], 'next');

    service.notifySupplyCreated();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});