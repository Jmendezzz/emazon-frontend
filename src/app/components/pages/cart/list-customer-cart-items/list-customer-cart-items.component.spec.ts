import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerCartItemsComponent } from './list-customer-cart-items.component';

describe('ListCustomerCartItemsComponent', () => {
  let component: ListCustomerCartItemsComponent;
  let fixture: ComponentFixture<ListCustomerCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCustomerCartItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCustomerCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
