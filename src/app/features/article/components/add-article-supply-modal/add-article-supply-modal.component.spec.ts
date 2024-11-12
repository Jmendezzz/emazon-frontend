import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleSupplyModalComponent } from './add-article-supply-modal.component';

describe('AddArticleSupplyModalComponent', () => {
  let component: AddArticleSupplyModalComponent;
  let fixture: ComponentFixture<AddArticleSupplyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticleSupplyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleSupplyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
