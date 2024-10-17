import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/domain/models/Pagination';
import { Observable, Subject } from 'rxjs';
import { Paginated } from 'src/app/domain/models/Paginated';
import { Category, CreateCategoryRequestDTO } from 'src/app/domain/models/Category';
import { Sorting } from 'src/app/domain/models/Sorting';
import { PAGE_OFFSET } from 'src/app/domain/utils/constants/Pagination';

@Injectable({
  providedIn: 'root',
})
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
