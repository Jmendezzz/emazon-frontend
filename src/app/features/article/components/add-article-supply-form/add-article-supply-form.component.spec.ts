import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleSupplyFormComponent } from './add-article-supply-form.component';

describe('AddArticleSupplyFormComponent', () => {
  let component: AddArticleSupplyFormComponent;
  let fixture: ComponentFixture<AddArticleSupplyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticleSupplyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleSupplyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
