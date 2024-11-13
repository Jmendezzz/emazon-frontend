import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleSupplyFormComponent } from './add-article-supply-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddArticleSupplyFormComponent', () => {
  let component: AddArticleSupplyFormComponent;
  let fixture: ComponentFixture<AddArticleSupplyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddArticleSupplyFormComponent ],
      schemas: [NO_ERRORS_SCHEMA],
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
