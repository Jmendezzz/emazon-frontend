import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerArticlesComponent } from './list-customer-articles.component';

describe('ListCustomerArticlesComponent', () => {
  let component: ListCustomerArticlesComponent;
  let fixture: ComponentFixture<ListCustomerArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCustomerArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCustomerArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
