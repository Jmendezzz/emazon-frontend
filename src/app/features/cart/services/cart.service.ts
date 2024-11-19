import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddArticleToCartRequestDTO, CartItemsResponseDTO, ResponseDTO } from '@/domain/models/Cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { ArticleSearchCriteria } from '@/domain/models/Article';
import { buildPaginationParams } from '@/domain/utils/functions/pagination-utils';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly apiURL = `${environment.cartSercviceUrl}/api/v1/cart`;

  constructor(private readonly httpClient: HttpClient) {}

  addArticleToCart(addArticleToCartRequest: AddArticleToCartRequestDTO): Observable<ResponseDTO> {
    return this.httpClient.post<ResponseDTO>(
      `${this.apiURL}/add-article`,
      addArticleToCartRequest
    );
  }

  getCartArticles(pagination: Pagination, sorting?:Sorting, searchCriteria?:ArticleSearchCriteria): Observable<CartItemsResponseDTO> {
    const params = buildPaginationParams(pagination, sorting);

    return this.httpClient.post<CartItemsResponseDTO>(`${this.apiURL}/articles`, {...searchCriteria}, {params});
  }

  deleteCartArticle(cartArticleId: number): Observable<ResponseDTO> {
    return this.httpClient.delete<ResponseDTO>(`${this.apiURL}/remove-article/${cartArticleId}`);
  }

}
