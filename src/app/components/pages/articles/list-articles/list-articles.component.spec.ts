import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesComponent } from './list-articles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListArticlesComponent', () => {
  let component: ListArticlesComponent;
  let fixture: ComponentFixture<ListArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArticlesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
