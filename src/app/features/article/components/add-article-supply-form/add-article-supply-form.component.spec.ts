import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Validators } from '@angular/forms';

import { ToastService } from '@/shared/services/ui/toast.service';
import { ModalService } from '@/shared/services/ui/modal.service';
import { ARTICLE_ADDED_TO_CART_MESSAGE, ARTICLE_ADDED_TO_CART_ERROR_MESSAGE, MIN_ADD_ARTICLE_QUANTITY } from '@/domain/utils/constants/Cart';
import { AddArticleToCartFormComponent } from '@/features/cart/components/add-article-to-cart-form/add-article-to-cart-form.component';
import { CartService } from '@/features/cart/services/cart.service';
import { ToastType } from '@/domain/models/Toast';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddArticleToCartFormComponent', () => {
  let component: AddArticleToCartFormComponent;
  let fixture: ComponentFixture<AddArticleToCartFormComponent>;
  let cartServiceMock: any;
  let toastServiceMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    cartServiceMock = {
      addArticleToCart: jest.fn(),
    };
    toastServiceMock = {
      showToast: jest.fn(),
    };
    modalServiceMock = {
      closeModal: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AddArticleToCartFormComponent],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticleToCartFormComponent);
    component = fixture.componentInstance;
    component.articleId = 1; 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should submit the form successfully and show success toast', () => {
    const quantity = 5;
    const addToCartResponse = { message: 'Success' };

    jest.spyOn(cartServiceMock, 'addArticleToCart').mockReturnValue(of(addToCartResponse));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');

    component.onSubmit({ quantity });

    expect(cartServiceMock.addArticleToCart).toHaveBeenCalledWith({
      articleId: component.articleId,
      quantity,
    });
    expect(showToastSpy).toHaveBeenCalledWith({
      message: ARTICLE_ADDED_TO_CART_MESSAGE,
      type: 'success', 
    });
    expect(modalServiceMock.closeModal).toHaveBeenCalledWith(`addArticleToCartModal-${component.articleId}`);
  });

  it('should handle form submission failure and show error toast', () => {
    const quantity = 3;
    const errorResponse = { message: 'Failed to add article to cart' };

    jest.spyOn(cartServiceMock, 'addArticleToCart').mockReturnValue(throwError(() => errorResponse));
    const showToastSpy = jest.spyOn(toastServiceMock, 'showToast');

    component.onSubmit({ quantity });

    expect(cartServiceMock.addArticleToCart).toHaveBeenCalledWith({
      articleId: component.articleId,
      quantity,
    });
    expect(showToastSpy).toHaveBeenCalledWith({
      message: ARTICLE_ADDED_TO_CART_ERROR_MESSAGE,
      type: ToastType.ERROR, 
    });
    expect(modalServiceMock.closeModal).not.toHaveBeenCalled();
  });
});
