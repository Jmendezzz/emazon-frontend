import { Article, ArticleSearchCriteria } from '@/domain/models/Article';
import { Paginated } from '@/domain/models/Paginated';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { AbstractListComponent } from '@/shared/abstracts/AbstractListComponent';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { Component} from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartArticleDTO, CartItemsResponseDTO } from '@/domain/models/Cart';

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.component.html',
  styleUrls: ['./cart-items-list.component.scss']
})
export class CartItemsListComponent extends AbstractListComponent<CartArticleDTO>{
  totalPrice: number | undefined = undefined;
  searchCriteria: ArticleSearchCriteria | undefined = undefined;

  override getItems(pagination: Pagination, sorting: Sorting): Observable<Paginated<CartArticleDTO>> {
    return this.cartService.getCartArticles(
      pagination,
      sorting,
      this.searchCriteria
    ).pipe(
      map((response: CartItemsResponseDTO) => {
        this.totalPrice = response.totalPrice;
        return {
         ...response.paginatedArticles
        };
      }
      )
    );
  }
  constructor(
    paginationService: PaginationService,
    private readonly cartService: CartService
  ) {
    super(paginationService);
  }

  onItemDeleted(cartArticle: CartArticleDTO): void {
    this.loadItems();
  }
}
