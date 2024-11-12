import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddArticleSupplyModalComponent } from './add-article-supply-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { of, Subject } from 'rxjs';
import { SupplyService } from '@/features/article/services/supply.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddArticleSupplyModalComponent', () => {
  let component: AddArticleSupplyModalComponent;
  let fixture: ComponentFixture<AddArticleSupplyModalComponent>;
  let modalServiceMock: any;
  let supplyServiceMock: any;
  const supplyCreatedSubject = new Subject<void>();

  beforeEach(async () => {
    modalServiceMock = {
      getModalObservable: jest.fn().mockReturnValue(of(false)),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    supplyServiceMock = {
      onSupplyCreated$: supplyCreatedSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [AddArticleSupplyModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: SupplyService, useValue: supplyServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleSupplyModalComponent);
    component = fixture.componentInstance;
    component.modalId = 'addArticleSupplyModal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalId and subscribe to supply creation event', () => {
    const closeModalSpy = jest.spyOn(component, 'closeModal');

    supplyCreatedSubject.next();

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