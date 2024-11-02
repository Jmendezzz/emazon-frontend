import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ArticleTableComponent } from './article-table.component';
import { ArticleService } from '../../services/article.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { delay, of, throwError } from 'rxjs';
import { ARTICLE_TABLE_HEADERS } from '@/domain/utils/constants/TableHeaders';
import { Paginated } from '@/domain/models/Paginated';
import { Article } from '@/domain/models/Article';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArticleTableComponent', () => {
  let component: ArticleTableComponent;
  let fixture: ComponentFixture<ArticleTableComponent>;
  let articleServiceMock: any;
  let paginationServiceMock: any;

  const mockPaginatedArticles: Paginated<Article> = {
    data: [
      {
        id: 1,
        name: 'Article 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
        brand: { id: 1, name: 'Brand 1', description: 'Brand 1' },
        categories: [{ id:1, name: 'Category 1' }],
      },
      {
        id: 2,
        name: 'Article 2',
        description: 'Description 2',
        price: 200,
        stock: 20,
        brand: { id: 1, name: 'Brand 2', description: 'Brand 2' },
        categories: [{ id:2, name: 'Category 2' }],
      },
    ],
    totalItems: 2,
    currentPage: 1,
    totalPages: 1,
  };

  beforeEach(async () => {
    articleServiceMock = {
      getArticles: jest.fn(),
      onArticleCreated$: of(),
    };

    paginationServiceMock = {
      getPaginationParams: jest.fn().mockReturnValue(
        of({
          pagination: { page: 1, size: 10 },
          sorting: { sortBy: 'name', direction: 'asc' },
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleTableComponent],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
        { provide: PaginationService, useValue: paginationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.headers).toEqual(ARTICLE_TABLE_HEADERS);
    expect(component.articles).toBeUndefined();
    expect(component.isLoading).toBe(false);
  });

  describe('loadArticles', () => {
    it('should load articles and set isLoading to false on success', fakeAsync(() => {
      const mockPagination = {
        pagination: { page: 1, size: 10 },
        sorting: { sortBy: 'name', direction: 'asc' },
      };

      paginationServiceMock.getPaginationParams.mockReturnValue(
        of(mockPagination)
      );
      articleServiceMock.getArticles.mockReturnValue(
        of(mockPaginatedArticles).pipe(delay(1000))
      );

      component.loadArticles();
      expect(component.isLoading).toBe(true);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.articles).toEqual(
        component.formatArticles(mockPaginatedArticles)
      );
    }));

    it('should handle error and set isLoading to false', fakeAsync(() => {
      paginationServiceMock.getPaginationParams.mockReturnValue(
        of({
          pagination: { page: 1, size: 10 },
          sorting: { sortBy: 'name', direction: 'asc' },
        }).pipe(delay(500))
      );

      articleServiceMock.getArticles.mockReturnValue(
        throwError(() => new Error('Failed to load articles')).pipe(delay(1000))
      );

      component.loadArticles();

      expect(component.isLoading).toBe(true);

      tick(500);

      tick(1000);

      expect(component.isLoading).toBe(false);
      expect(component.articles).toBeUndefined();
    }));
  });

  describe('onArticleCreated', () => {
    it('should reload articles when a new article is created', () => {
      const loadArticlesSpy = jest.spyOn(component, 'loadArticles');

      articleServiceMock.onArticleCreated$ = of();

      component.ngOnInit();

      expect(loadArticlesSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should call loadArticles and onArticleCreated', () => {
      const loadArticlesSpy = jest.spyOn(component, 'loadArticles');
      const onArticleCreatedSpy = jest.spyOn(component, 'onArticleCreated');

      component.ngOnInit();

      expect(loadArticlesSpy).toHaveBeenCalled();
      expect(onArticleCreatedSpy).toHaveBeenCalled();
    });
  });
});
