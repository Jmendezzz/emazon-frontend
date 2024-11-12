import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ModalService } from '@/shared/services/ui/modal.service';
import { ESCAPE_KEY } from '@/domain/utils/constants/Common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalServiceMock: any;

  beforeEach(async () => {
    modalServiceMock = {
      getModalObservable: jest.fn(() => of(false)), 
      closeModal: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [{ provide: ModalService, useValue: modalServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.modalId = 'testModal';
    component.isOpen = true; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal when closeModal is called', () => {
    component.closeModal();
    expect(modalServiceMock.closeModal).toHaveBeenCalledWith('testModal');
  });

  it('should close the modal when the escape key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: ESCAPE_KEY });
    document.dispatchEvent(event);
    expect(modalServiceMock.closeModal).toHaveBeenCalledWith('testModal');
  });

  it('should display the title', () => {
    component.title = 'Test Modal';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.modal__title')).nativeElement;
    expect(titleElement.textContent).toContain('Test Modal');
  });

  it('should call closeModal when the close button is clicked', () => {
    const closeButton = fixture.debugElement.query(By.css('.modal__close')).nativeElement;
    closeButton.click();
    expect(modalServiceMock.closeModal).toHaveBeenCalledWith('testModal');
  });
});