import { Article } from '@/domain/models/Article';
import { Paginated } from '@/domain/models/Paginated';
import { TableHeader } from '@/domain/models/TableHeader';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { ARTICLE_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { ArticleService } from '../../services/article.service';
import { TableAction } from '@/domain/models/Table';
import { ModalService } from '@/shared/services/ui/modal.service';
import { AuthService } from '@/features/authentication/services/auth.service';
import { Role } from '@/domain/models/Auth';

interface ArticleTableData {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  categories: string;
}

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss'],
})
export class ArticleTableComponent implements OnInit, OnDestroy {
  headers: TableHeader[] = ARTICLE_TABLE_HEADERS;
  articles: Paginated<ArticleTableData> | undefined = undefined;
  isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();
   selectedArticle: ArticleTableData | undefined = undefined;

  constructor(
    private readonly articleService: ArticleService,
    private readonly paginationService: PaginationService,
    private readonly modalService: ModalService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    this.onArticleCreated();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.paginationService
      .getPaginationParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ pagination, sorting }) => {
        const searchCriteria = {};
        this.articleService
          .getArticles(pagination, sorting, searchCriteria)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (articles) => {
              this.articles = this.formatArticles(articles);
              this.isLoading = false;
            },
            error: (error) => {
              this.isLoading = false;
            },
          });
      });
  }

  formatArticles(articles: Paginated<Article>): Paginated<ArticleTableData> {
    return {
      ...articles,
      data: articles.data.map((article) => ({
        id: article.id,
        name: article.name,
        description: article.description,
        price: article.price,
        stock: article.stock,
        brand: article.brand.name,
        categories: article.categories.map((category) => category.name).join(', '),
      })),
    };
  }

  onArticleCreated(): void {
    this.articleService.onArticleCreated$.subscribe(() => {
      this.loadArticles();
    });
  }

  getActions(): TableAction<ArticleTableData>[] | undefined {

    if(this.authService.userDetails()?.role == Role.WAREHOUSE_ASSISTANT){
      return [
        {
          label: 'Add Supply',
          icon: '/assets/ui/add-supply.svg',
          action: (article) => {
            this.modalService.openModal('addArticleSupplyModal');
            this.selectedArticle = article;
          }
        }
      ]
    }

    return undefined;
  }
}
