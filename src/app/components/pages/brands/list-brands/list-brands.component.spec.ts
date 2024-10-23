import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrandsComponent } from './list-brands.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListBrandsComponent', () => {
  let component: ListBrandsComponent;
  let fixture: ComponentFixture<ListBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBrandsComponent ],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
