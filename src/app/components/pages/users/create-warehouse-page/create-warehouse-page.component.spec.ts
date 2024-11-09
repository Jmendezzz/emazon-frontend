import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehousePageComponent } from './create-warehouse-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateWarehousePageComponent', () => {
  let component: CreateWarehousePageComponent;
  let fixture: ComponentFixture<CreateWarehousePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehousePageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWarehousePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
