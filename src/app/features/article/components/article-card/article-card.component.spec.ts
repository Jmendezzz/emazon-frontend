import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@/features/authentication/services/auth.service';
import { ModalService } from '@/shared/services/ui/modal.service';

import { ArticleCardComponent } from './article-card.component';
import { Article } from '@/domain/models/Article';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;
  let authServiceMock: any;
  let modalServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      userDetails: jest.fn(),
    };
    modalServiceMock = {
      openModal: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleCardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    component.article = {
      id: 1,
      name: 'Sample Article',
      description: 'Sample Description',
      price: 50,
      stock: 100,
      brand: { id: 1, name: 'Sample Brand', description: 'Sample Brand Description' },
      categories: []
    } as Article; 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login if user is not authenticated on handleAddToCart', () => {
    authServiceMock.userDetails.mockReturnValue(null); // Simulate unauthenticated user

    component.handleAddToCart();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(modalServiceMock.openModal).not.toHaveBeenCalled();
  });

  it('should open modal if user is authenticated on handleAddToCart', () => {
    authServiceMock.userDetails.mockReturnValue({ id: 1, name: 'Test User' }); // Simulate authenticated user

    component.handleAddToCart();

    expect(modalServiceMock.openModal).toHaveBeenCalledWith(`addArticleToCartModal-${component.article.id}`);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
