import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from '../../services/article.service';
import { PaginationService } from '@/shared/services/ui/pagination.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let articleServiceMock: any;
  let paginationServiceMock: any;

  beforeEach(async () => {
    articleServiceMock = {
      getArticles: jest.fn().mockReturnValue(of({
        data: [
          { id: 1, name: 'Article 1', description: 'Description 1', price: 100, stock: 10 },
          { id: 2, name: 'Article 2', description: 'Description 2', price: 200, stock: 20 },
        ],
        totalItems: 2,
        currentPage: 1,
        totalPages: 1,
      })),
    };

    paginationServiceMock = {
      getPaginationParams: jest.fn().mockReturnValue(of({
        pagination: { page: 1, size: 10 },
        sorting: { sortBy: 'name', direction: 'asc' },
      })),
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
        { provide: PaginationService, useValue: paginationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should set items and loading to false after successful data fetch', () => {
    component.loadItems();
    expect(component.isLoading).toBe(false);
    expect(component.items?.data.length).toBe(2);
  });

  it('should handle errors when fetching articles', () => {
    articleServiceMock.getArticles.mockReturnValue(throwError(() => new Error('Error fetching articles')));
    component.loadItems();
    expect(component.isLoading).toBe(false);
  });

  it('should update items when pagination params change', () => {
    paginationServiceMock.getPaginationParams.mockReturnValue(of({
      pagination: { page: 2, size: 10 },
      sorting: { sortBy: 'name', direction: 'desc' },
    }));
    component.loadItems();
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(
      { page: 2, size: 10 },
      { sortBy: 'name', direction: 'desc' },
      undefined
    );
  });
});