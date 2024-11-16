import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { AddArticleToCartRequestDTO, ResponseDTO } from '@/domain/models/Cart';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an article to the cart', () => {
    const addArticleToCartRequest: AddArticleToCartRequestDTO = {
      articleId: 1,
      quantity: 2,
    };

    const response: ResponseDTO = {
      message: 'Article added to cart successfully',
    };

    service.addArticleToCart(addArticleToCartRequest).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/add-article`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(addArticleToCartRequest);
    req.flush(response);
  });
});