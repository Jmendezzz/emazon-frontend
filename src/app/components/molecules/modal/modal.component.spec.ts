import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from 'src/app/shared/services/ui/modal.service';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: jest.Mocked<ModalService>;

  beforeEach(() => {
    modalService = {
      getModalObservable: jest.fn(),
      closeModal: jest.fn(),
    } as any; 

    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: ModalService, useValue: modalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should subscribe to modal observable on init', () => {
    // Arrange
    const isOpen = true;
    modalService.getModalObservable.mockReturnValue(of(isOpen)); 

    component.ngOnInit();
    fixture.detectChanges(); 

    expect(component.isOpen).toBe(isOpen);
    expect(modalService.getModalObservable).toHaveBeenCalled();
  });

  it('should close modal when closeModal is called', () => {
    component.closeModal();

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should update isOpen when modal observable emits true', () => {
    const modalOpen$ = of(true);
    modalService.getModalObservable.mockReturnValue(modalOpen$);

    component.ngOnInit(); 
    fixture.detectChanges(); 

    expect(component.isOpen).toBe(true);
  });

  it('should update isOpen when modal observable emits false', () => {
    const modalClosed$ = of(false);
    modalService.getModalObservable.mockReturnValue(modalClosed$);

    component.ngOnInit(); 
    fixture.detectChanges(); 

    expect(component.isOpen).toBe(false);
  });
});
