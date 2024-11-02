import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate when changePage is called with valid page', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.changePage(3);
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { page: 3 },
      queryParamsHandling: 'merge',
    });
    expect(component.currentPage).toBe(3);
  });

  it('should not call router.navigate when changePage is called with the same page', () => {
    component.currentPage = 2;
    component.totalPages = 5;
    component.changePage(2);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  it('should render the correct number of pages', () => {
    component.totalPages = 5;
    fixture.detectChanges();
    const pageButtons = fixture.debugElement.queryAll(By.css('.pagination__button'));
    expect(pageButtons.length).toBe(5); 
  });

  it('should disable the previous button on the first page', () => {
    component.currentPage = 1;
    component.totalPages = 5;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(By.css('button[aria-label="Previous page"]'));
    expect(prevButton).toBeNull();
  });

  it('should disable the next button on the last page', () => {
    component.currentPage = 5;
    component.totalPages = 5;
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(By.css('button[aria-label="Next page"]'));
    expect(nextButton).toBeNull();
  });

  it('should call changePage with the correct page number when a page button is clicked', () => {
    component.totalPages = 5;
    fixture.detectChanges();
    const pageButtons = fixture.debugElement.queryAll(By.css('.pagination__button'));
    pageButtons[2].nativeElement.click();
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { page: 3 },
      queryParamsHandling: 'merge',
    });
    expect(component.currentPage).toBe(3);
  });
});