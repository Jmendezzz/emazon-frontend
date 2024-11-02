import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { Paginated } from '@/domain/models/Paginated';
import { Category, CreateCategoryRequestDTO } from '@/domain/models/Category';
import { environment } from '../../../../environments/environment';
import { buildPaginationParams } from '@/domain/utils/functions/pagination-utils';
@Injectable()
export class CategoryService {
  private readonly apiURL = `${environment.stockServiceUrl}/api/v1/categories`;
  private readonly categoryCreatedSource = new Subject<void>();
  
  onCategoryCreated$ = this.categoryCreatedSource.asObservable();  

  constructor(private readonly httpClient: HttpClient) {}

  getCategories(pagination: Pagination, sorting: Sorting): Observable<Paginated<Category>> {
    const params = buildPaginationParams(pagination, sorting);
    return this.httpClient.get<Paginated<Category>>(this.apiURL, { params });
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiURL}/all`);
  }

  createCategory(category: CreateCategoryRequestDTO): Observable<Category> {
    return this.httpClient.post<Category>(`${this.apiURL}/create`, category);
  }

  notifyCategoryCreated() {
    this.categoryCreatedSource.next();
  }
}
