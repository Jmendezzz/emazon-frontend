import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcumbComponent } from './breadcumb.component';
import { of } from 'rxjs';
import { Breadcrumb } from '@/shared/types/common-types';
import { BreadcrumbService } from '@/shared/services/ui/breadcrumb.service';

class MockBreadcrumbService {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/home' },
    { label: 'Products', url: '/products' },
  ];

  get breadcrumbs$() {
    return of(this.breadcrumbs);
  }
}

describe('BreadcumbComponent', () => {
  let component: BreadcumbComponent;
  let fixture: ComponentFixture<BreadcumbComponent>;
  let breadcrumbService: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcumbComponent],
      providers: [{ provide: BreadcrumbService, useClass: MockBreadcrumbService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcumbComponent);
    component = fixture.componentInstance;
    breadcrumbService = TestBed.inject(BreadcrumbService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breadcrumbs from the breadcrumb service', () => {
    component.ngOnInit();
    expect(component.breadcrumbs.length).toBe(2);
    expect(component.breadcrumbs).toEqual(breadcrumbService.breadcrumbs);
  });
});
