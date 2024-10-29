import { Article, ArticleSearchCriteria } from '@/domain/models/Article';
import { Paginated } from '@/domain/models/Paginated';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { buildPaginationParams } from '@/domain/utils/functions/pagination-utils';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly apiURL = `${environment.stockServiceUrl}/api/v1/articles`;

  constructor(private readonly httpClient: HttpClient) { }

  getArticles(pagination: Pagination, sorting:Sorting, searchCriteria?:ArticleSearchCriteria): Observable<Paginated<Article>> {
    const params = buildPaginationParams(pagination, sorting);

    return this.httpClient.post<Paginated<Article>>(`${this.apiURL}/search`, {searchCriteria}, {params});
  }
}
