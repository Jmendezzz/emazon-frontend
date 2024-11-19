import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleToCartFormComponent } from './add-article-to-cart-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddArticleToCartFormComponent', () => {
  let component: AddArticleToCartFormComponent;
  let fixture: ComponentFixture<AddArticleToCartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticleToCartFormComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleToCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
