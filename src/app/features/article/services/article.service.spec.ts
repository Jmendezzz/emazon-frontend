import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { Article, ArticleSearchCriteria, CreateArticleRequestDTO } from '@/domain/models/Article';
import { Paginated } from '@/domain/models/Paginated';
import { Pagination } from '@/domain/models/Pagination';
import { Sorting } from '@/domain/models/Sorting';
import { buildPaginationParams } from '@/domain/utils/functions/pagination-utils';

jest.mock('@/domain/utils/functions/pagination-utils', () => ({
  buildPaginationParams: jest.fn(),
}));

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get articles with pagination, sorting, and search criteria', () => {
    const pagination: Pagination = { page: 0, size: 10 };
    const sorting: Sorting = { sortBy: 'name', direction: 'ASC' };
    const searchCriteria: ArticleSearchCriteria = {};
    const mockArticles: Paginated<Article> = {
      data: [
        { id: 1, name: 'Article 1', description: 'Description 1', price: 100, stock: 10, brand: { id: 1, name: 'Brand 1', description: 'Brand 1' }, categories: [{ id: 1, name: 'Category 1' }] },
        { id: 2, name: 'Article 2', description: 'Description 2', price: 200, stock: 20, brand: { id: 2, name: 'Brand 2', description: 'Brand 2' }, categories: [{ id: 2, name: 'Category 2' }] },
      ],
      currentPage: 0,
      totalItems: 2,
      totalPages: 1
    };

    const mockParams = {
      page: '0',
      size: '10',
      sortBy: 'name',
      direction: 'ASC'
    };

    (buildPaginationParams as jest.Mock).mockReturnValue(mockParams);

    service.getArticles(pagination, sorting, searchCriteria).subscribe((response) => {
      expect(response).toEqual(mockArticles);
    });

    const req = httpMock.expectOne((request) => request.method === 'POST' && request.url === `${service['apiURL']}/search`);
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');
    expect(req.request.params.get('sortBy')).toEqual('name');
    expect(req.request.params.get('direction')).toEqual('ASC');
    expect(req.request.body).toEqual({ searchCriteria });
    req.flush(mockArticles);
  });

  it('should create an article', () => {
    const newArticle: CreateArticleRequestDTO = {
      name: 'New Article',
      description: 'New Article Description',
      price: 100,
      stock: 10,
      brandId: 1,
      categoriesIds: [1, 2]
    };

    const createdArticle: Article = {
      id: 1,
      name: 'New Article',
      description: 'New Article Description',
      price: 100,
      stock: 10,
      brand: { id: 1, name: 'Brand A', description: 'Brand A Description' },
      categories: [{ id: 1, name: 'Category A' }]
    };

    service.createArticle(newArticle).subscribe((response) => {
      expect(response).toEqual(createdArticle);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newArticle);
    req.flush(createdArticle);
  });

  it('should notify article creation', () => {
    const spy = jest.spyOn(service['articleCreatedSource'], 'next');

    service.notifyArticleCreated();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});