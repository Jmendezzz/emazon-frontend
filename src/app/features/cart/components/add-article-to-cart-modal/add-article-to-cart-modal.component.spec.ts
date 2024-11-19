import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddArticleToCartModalComponent } from './add-article-to-cart-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { of} from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddArticleToCartModalComponent', () => {
  let component: AddArticleToCartModalComponent;
  let fixture: ComponentFixture<AddArticleToCartModalComponent>;
  let modalServiceMock: any;

  beforeEach(async () => {
    modalServiceMock = {
      getModalObservable: jest.fn().mockReturnValue(of(false)),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AddArticleToCartModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleToCartModalComponent);
    component = fixture.componentInstance;
    component.articleId = 1;
    component.modalId = 'addArticleToCartModal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalId', () => {
    expect(component.modalId).toBe(`addArticleToCartModal-${component.articleId}`);
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