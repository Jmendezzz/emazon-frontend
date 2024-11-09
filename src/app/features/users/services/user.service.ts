import { Paginated } from '@/domain/models/Paginated';
import { Pagination } from '@/domain/models/Pagination';
import { CreateUserRequestDTO, User } from '@/domain/models/User';
import { buildPaginationParams } from '@/domain/utils/functions/pagination-utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiURL = `${environment.userServiceUrl}/api/v1/users`;

  constructor(private readonly httpClient: HttpClient) { }

  getWarehouses(pagination: Pagination): Observable<Paginated<User>>{
    const params = buildPaginationParams(pagination);

    return this.httpClient.get<Paginated<User>>(`${this.apiURL}/warehouse-assistants`, { params });
  }

  createWarehouseAssistant(user: CreateUserRequestDTO): Observable<User>{
    return this.httpClient.post<User>(`${this.apiURL}/create/warehouse-assistant`, user);
  }
}
