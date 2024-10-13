import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockRouter {
  navigate = jest.fn();
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct pages array', () => {
    component.totalPages = 5;
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
    
    component.totalPages = 0;
    expect(component.pages).toEqual([]);
  });

  it('should call router.navigate when changePage is called with valid page', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.changePage(3);
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { page: 2 },
      queryParamsHandling: 'merge',
    });
    expect(component.currentPage).toBe(3);
  });

  it('should not call router.navigate when changePage is called with invalid page (out of range)', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.changePage(6);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.currentPage).toBe(6); 
  });

  it('should not call router.navigate when changePage is called with same page', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.changePage(2);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update currentPage even if router.navigate is not called', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.changePage(1);
    expect(component.currentPage).toBe(1);
  });
});
