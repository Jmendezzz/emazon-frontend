import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehouseButtonComponent } from './create-warehouse-button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateWarehouseButtonComponent', () => {
  let component: CreateWarehouseButtonComponent;
  let fixture: ComponentFixture<CreateWarehouseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehouseButtonComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWarehouseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
