import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleModalComponent } from './create-article-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { ArticleService } from '../../services/article.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateArticleModalComponent', () => {
  let component: CreateArticleModalComponent;
  let fixture: ComponentFixture<CreateArticleModalComponent>;
  let modalServiceMock: any;
  let articleServiceMock: any;

  beforeEach(async () => {
    modalServiceMock = {
      openModal: jest.fn(),
      closeModal: jest.fn()
    };

    articleServiceMock = {
      onArticleCreated$: of(null)
    };

    await TestBed.configureTestingModule({
      declarations: [CreateArticleModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: ArticleService, useValue: articleServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to onArticleCreated$ and close the modal', () => {
    expect(modalServiceMock.closeModal).toHaveBeenCalled();
  });

  it('should call openModal when openModal() is called', () => {
    component.openModal();
    expect(modalServiceMock.openModal).toHaveBeenCalled();
  });
});