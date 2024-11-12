import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleTableComponent } from './article-table.component';
import { ArticleService } from '../../services/article.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { ModalService } from '@/shared/services/ui/modal.service';
import { AuthService } from '@/features/authentication/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { Paginated } from '@/domain/models/Paginated';
import { Article } from '@/domain/models/Article';
import { Role } from '@/domain/models/Auth';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArticleTableComponent', () => {
  let component: ArticleTableComponent;
  let fixture: ComponentFixture<ArticleTableComponent>;
  let articleServiceMock: any;
  let paginationServiceMock: any;
  let modalServiceMock: any;
  let authServiceMock: any;

  const articles: Paginated<Article> = {
    data: [
      {
        id: 1,
        name: 'Article 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
        brand: { id: 1, name: 'Brand 1', description: 'Brand 1' },
        categories: [{ id: 1, name: 'Category 1' }],
      },
      {
        id: 2,
        name: 'Article 2',
        description: 'Description 2',
        price: 200,
        stock: 20,
        brand: { id: 1, name: 'Brand 2', description: 'Brand 2' },
        categories: [{ id: 2, name: 'Category 2' }],
      },
    ],
    totalItems: 2,
    currentPage: 1,
    totalPages: 1,
  };

  beforeEach(async () => {
    articleServiceMock = {
      getArticles: jest.fn().mockReturnValue(of(articles)),
      onArticleCreated$: new Subject<void>(),
    };

    paginationServiceMock = {
      getPaginationParams: jest.fn().mockReturnValue(of({ pagination: { page: 1, size: 10 }, sorting: { sortBy: 'name', direction: 'asc' } })),
    };

    modalServiceMock = {
      openModal: jest.fn(),
    };

    authServiceMock = {
      userDetails: jest.fn().mockReturnValue({ role: Role.WAREHOUSE_ASSISTANT }),
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleTableComponent],
      imports: [HttpClientTestingModule], 
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
        { provide: PaginationService, useValue: paginationServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', () => {
    expect(articleServiceMock.getArticles).toHaveBeenCalled();
    expect(component.articles?.data.length).toBe(2);
  });

  it('should format articles correctly', () => {
    const formattedArticles = component.formatArticles(articles);
    expect(formattedArticles.data[0].brand).toBe('Brand 1');
    expect(formattedArticles.data[0].categories).toBe('Category 1');
  });

  it('should reload articles when an article is created', () => {
    const loadArticlesSpy = jest.spyOn(component, 'loadArticles');
    articleServiceMock.onArticleCreated$.next();
    expect(loadArticlesSpy).toHaveBeenCalled();
  });

  it('should return actions for warehouse assistant role', () => {
    const actions = component.getActions();
    expect(actions?.length).toBe(1);
    expect(actions?.[0].label).toBe('Add Supply');
  });

  it('should open modal and set selected article when Add Supply action is triggered', () => {
    const actions = component.getActions();
    const article = { id: 1, name: 'Article 1', description: 'Description 1', price: 100, stock: 10, brand: 'Brand 1', categories: 'Category 1' };
    actions?.[0].action(article);
    expect(modalServiceMock.openModal).toHaveBeenCalledWith('addArticleSupplyModal');
    expect(component.selectedArticle).toBe(article);
  });

  it('should handle error and set isLoading to false', () => {
    articleServiceMock.getArticles.mockReturnValue(of({ error: 'Error loading articles' }));
    component.loadArticles();
    expect(component.isLoading).toBe(false);
  });
});