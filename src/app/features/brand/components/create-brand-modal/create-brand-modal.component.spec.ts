import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBrandModalComponent } from './create-brand-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { BrandService } from '@/features/brand/services/brand.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreateBrandModalComponent', () => {
  let component: CreateBrandModalComponent;
  let fixture: ComponentFixture<CreateBrandModalComponent>;
  let modalServiceMock: any;
  let brandServiceMock: any;
  const brandCreatedSubject = new Subject<void>();

  beforeEach(async () => {
    modalServiceMock = {
      getModalObservable: jest.fn().mockReturnValue(of(false)),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    };

    brandServiceMock = {
      onBrandCreated$: brandCreatedSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateBrandModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: BrandService, useValue: brandServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrandModalComponent);
    component = fixture.componentInstance;
    component.modalId = 'createBrandModal';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalId and subscribe to brand creation event', () => {
    const closeModalSpy = jest.spyOn(component, 'closeModal');

    brandCreatedSubject.next();

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