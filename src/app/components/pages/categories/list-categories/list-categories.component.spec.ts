import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriesComponent } from './list-categories.component';
import { AdminSectionComponent } from '@/features/admin/components';
import { CreateCategoryModalComponent } from '@/features/category/components/organisms/create-category-modal/create-category-modal.component';
import { CategoryTableComponent } from '@/features/category/components/organisms/category-table/category-table.component';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoriesComponent, AdminSectionComponent, CreateCategoryModalComponent, CategoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
