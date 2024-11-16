import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerArticlesComponent } from './list-customer-articles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListCustomerArticlesComponent', () => {
  let component: ListCustomerArticlesComponent;
  let fixture: ComponentFixture<ListCustomerArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCustomerArticlesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [HttpClientTestingModule]
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
