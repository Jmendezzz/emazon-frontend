import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesTableComponent } from './warehouses-table.component';

describe('WarehousesTableComponent', () => {
  let component: WarehousesTableComponent;
  let fixture: ComponentFixture<WarehousesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
