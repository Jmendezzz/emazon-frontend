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
    expect(service.isModalOpen.value).toBe(false);
  });

  describe('getModalObservable', () => {
    it('should return an observable of the modal state', (done) => {
      service.getModalObservable().subscribe((isOpen) => {
        expect(isOpen).toBe(false);
        done();
      });
    });
  });

  describe('openModal', () => {
    it('should set the modal state to open (true)', () => {
      service.openModal();
      expect(service.isModalOpen.value).toBe(true);
    });
  });

  describe('closeModal', () => {
    it('should set the modal state to closed (false)', () => {
      service.openModal(); // First open the modal
      service.closeModal(); // Then close it
      expect(service.isModalOpen.value).toBe(false);
    });
  });
});
