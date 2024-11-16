import { Article, ArticleSearchCriteria } from '@/domain/models/Article';
import { Paginated } from '@/domain/models/Paginated';
import { Pagination } from '@/domain/models/Pagination';
import { AbstractListComponent } from '@/shared/abstracts/AbstractListComponent';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Sorting } from '@/domain/models/Sorting';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent extends AbstractListComponent<Article> {
  searchCriteria: ArticleSearchCriteria | undefined = undefined;

  override getItems(pagination: Pagination, sorting: Sorting): Observable<Paginated<Article>> {
    return this.articleService.getArticles(
      pagination,
      sorting,
      this.searchCriteria
    );
  }

  constructor(
    paginationService: PaginationService,
    private readonly articleService: ArticleService
  ) {
    super(paginationService);
  }
}
