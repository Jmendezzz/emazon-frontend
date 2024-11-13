import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoryModalComponent } from './create-category-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { CategoryService } from '@/features/category/services/category.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateCategoryModalComponent', () => {
  let component: CreateCategoryModalComponent;
  let fixture: ComponentFixture<CreateCategoryModalComponent>;
  let modalServiceMock: any;
  let categoryServiceMock: any;
  const categoryCreatedSubject = new Subject<void>();

  beforeEach(async () => {
    modalServiceMock = {
      getModalObservable: jest.fn().mockReturnValue(of(false)),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    categoryServiceMock = {
      onCategoryCreated$: categoryCreatedSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryModalComponent);
    component = fixture.componentInstance;
    component.modalId = 'createCategoryModal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalId and subscribe to category creation event', () => {
    const closeModalSpy = jest.spyOn(component, 'closeModal');

    categoryCreatedSubject.next();

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