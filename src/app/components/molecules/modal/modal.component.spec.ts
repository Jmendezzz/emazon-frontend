import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ModalService } from '@/shared/services/ui/modal.service';
import { ESCAPE_KEY } from '@/domain/utils/constants/Common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    const modalServiceMock = {
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
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with modal closed', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should update isOpen when modalService emits true', () => {
    jest.spyOn(modalService, 'getModalObservable').mockReturnValue(of(true)); 
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
  });

  it('should call closeModal on modalService when closeModal is triggered', () => {
    component.closeModal();
    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should close modal when ESCAPE_KEY is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: ESCAPE_KEY });
    component.isOpen = true;
    fixture.detectChanges();

    component.handleKeyDown(event);
    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should not close modal if another key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.isOpen = true;
    fixture.detectChanges();

    component.handleKeyDown(event);
    expect(modalService.closeModal).not.toHaveBeenCalled();
  });

  it('should close modal when clicking outside modal content', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    modalElement.triggerEventHandler('click', new MouseEvent('click'));

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should not close modal when clicking inside modal content', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const contentElement = fixture.debugElement.query(By.css('.modal__content'));
    contentElement.triggerEventHandler('click', new MouseEvent('click', { bubbles: true }));

    expect(modalService.closeModal).not.toHaveBeenCalled();
  });

  it('should render title when provided via @Input()', () => {
    component.isOpen = true; 
    component.title = 'Test Modal Title';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.modal__title')).nativeElement;
    expect(titleElement.textContent).toContain('Test Modal Title');
  });

  it('should render the modal if isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();
  });

  it('should render the modal if isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();
  });

  it('should not render the modal if isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeNull(); 
  });
});
