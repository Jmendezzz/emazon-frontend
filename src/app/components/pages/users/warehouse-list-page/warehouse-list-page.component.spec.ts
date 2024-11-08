import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseListPageComponent } from './warehouse-list-page.component';

describe('WarehouseListPageComponent', () => {
  let component: WarehouseListPageComponent;
  let fixture: ComponentFixture<WarehouseListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
