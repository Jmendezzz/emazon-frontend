import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBrandModalComponent } from './create-brand-modal.component';
import { ModalService } from '@/shared/services/ui/modal.service';
import { of } from 'rxjs'; 
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Para evitar errores con componentes no declarados
import { BrandService } from '@/features/brand/services/brand.service';

describe('CreateBrandModalComponent', () => {
  let component: CreateBrandModalComponent;
  let fixture: ComponentFixture<CreateBrandModalComponent>;
  let modalServiceMock: any;
  let brandServiceMock: any;

  beforeEach(async () => {
    modalServiceMock = {
      openModal: jest.fn(),
      closeModal: jest.fn()
    };

    brandServiceMock = {
      onBrandCreated$: of(null)
    };

    await TestBed.configureTestingModule({
      declarations: [CreateBrandModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: BrandService, useValue: brandServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to onBrandCreated$ and close the modal', () => {
    expect(modalServiceMock.closeModal).toHaveBeenCalled();
  });

  it('should call openModal when openModal() is called', () => {
    component.openModal();
    expect(modalServiceMock.openModal).toHaveBeenCalled();
  });
});