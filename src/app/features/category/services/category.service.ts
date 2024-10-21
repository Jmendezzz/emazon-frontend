import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { Paginated } from '@/domain/models/Paginated';
import { Category, CreateCategoryRequestDTO } from '@/domain/models/Category';
import { PAGE_OFFSET } from '@/domain/utils/constants/Pagination';
import { environment } from '../../../../environments/environment';
@Injectable()
export class CategoryService {
  private readonly apiURL = `${environment.stockServiceUrl}/api/v1/categories`;

  private readonly categoryCreatedSource = new Subject<void>();
  onCategoryCreated$ = this.categoryCreatedSource.asObservable();  


  constructor(private readonly httpClient: HttpClient) {}

  getCategories(pagination: Pagination, sorting: Sorting): Observable<Paginated<Category>> {
    const params: { [key: string]: any } = {}
    if (pagination.page) {
      params['page'] = (typeof pagination.page === 'number' ? pagination.page : parseInt(pagination.page, 10)) - PAGE_OFFSET;
    }
    if (pagination.size) {
      params['size'] = pagination.size;
    }
    if (sorting.sortBy) {
      params['sortBy'] = sorting.sortBy;
    }
    if (sorting.direction) {
      params['direction'] = sorting.direction.toUpperCase();
    }
    return this.httpClient.get<Paginated<Category>>(this.apiURL, { params });
  }

  createCategory(category: CreateCategoryRequestDTO): Observable<Category> {
    return this.httpClient.post<Category>(`${this.apiURL}/create`, category);
  }

  notifyCategoryCreated() {
    this.categoryCreatedSource.next();
  }
}
