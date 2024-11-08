import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehousePageComponent } from './create-warehouse-page.component';

describe('CreateWarehousePageComponent', () => {
  let component: CreateWarehousePageComponent;
  let fixture: ComponentFixture<CreateWarehousePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehousePageComponent ]
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
