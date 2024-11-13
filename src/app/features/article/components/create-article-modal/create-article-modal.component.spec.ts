import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleModalComponent } from './create-article-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { ArticleService } from '@/features/article/services/article.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateArticleModalComponent', () => {
  let component: CreateArticleModalComponent;
  let fixture: ComponentFixture<CreateArticleModalComponent>;
  let modalServiceMock: any;
  let articleServiceMock: any;
  const articleCreatedSubject = new Subject<void>();

  beforeEach(async () => {
    modalServiceMock = {
      getModalObservable: jest.fn().mockReturnValue(of(false)),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    articleServiceMock = {
      onArticleCreated$: articleCreatedSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateArticleModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: ArticleService, useValue: articleServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleModalComponent);
    component = fixture.componentInstance;
    component.modalId = 'createArticleModal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalId and subscribe to article creation event', () => {
    const closeModalSpy = jest.spyOn(component, 'closeModal');

    articleCreatedSubject.next();

    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should open the modal by calling modalService.openModal', () => {
    component.openModal();
    expect(modalServiceMock.openModal).toHaveBeenCalledWith(component.modalId);
  });

  it('should close the modal by calling modalService.closeModal', () => {
    component.closeModal();
    expect(modalServiceMock.closeModal).toHaveBeenCalledWith(component.modalId);
  });
});
