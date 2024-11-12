import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the modal closed', () => {
    const modalId = 'testModal';
    const modalObservable = service.getModalObservable(modalId);
    modalObservable.subscribe(isOpen => {
      expect(isOpen).toBe(false);
    });
  });

  it('should open the modal', () => {
    const modalId = 'testModal';
    service.openModal(modalId);
    const modalObservable = service.getModalObservable(modalId);
    modalObservable.subscribe(isOpen => {
      expect(isOpen).toBe(true);
    });
  });

  it('should close the modal', () => {
    const modalId = 'testModal';
    service.openModal(modalId); // Open the modal first
    service.closeModal(modalId);
    const modalObservable = service.getModalObservable(modalId);
    modalObservable.subscribe(isOpen => {
      expect(isOpen).toBe(false);
    });
  });
});