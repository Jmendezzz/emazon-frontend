import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { buildPaginationParams } from '@/domain/utils/functions/pagination-utils';
import { Observable, Subject } from 'rxjs';
import { Brand, CreateBrandRequestDTO } from '@/domain/models/Brand';
import { Paginated } from '@/domain/models/Paginated';

@Injectable()
export class BrandService {
  private readonly apiURL = `${environment.stockServiceUrl}/api/v1/brands`;
  private readonly brandCreatedSource = new Subject<void>();

  onBrandCreated$ = this.brandCreatedSource.asObservable();  

  constructor(private readonly httpClient: HttpClient) { }

  getBrands(pagination: Pagination, sorting: Sorting): Observable<Paginated<Brand>>{
    const params = buildPaginationParams(pagination, sorting);
    return this.httpClient.get<Paginated<Brand>>(this.apiURL, { params });
  }

  getAllBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.apiURL}/all`);
  }

  createBrand(brand: CreateBrandRequestDTO): Observable<Brand> {
    return this.httpClient.post<Brand>(`${this.apiURL}/create`, brand);
  }

  notifyBrandCreated() {
    this.brandCreatedSource.next();
  }
}
