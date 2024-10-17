import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoryModalComponent } from './create-category-modal.component';
import { CategoryService } from 'src/app/shared/services/api/category.service';
import { ModalService } from 'src/app/shared/services/ui/modal.service';
import { of } from 'rxjs';

describe('CreateCategoryModalComponent', () => {
  let component: CreateCategoryModalComponent;
  let fixture: ComponentFixture<CreateCategoryModalComponent>;
  let modalServiceMock: jest.Mocked<ModalService>;
  let categoryServiceMock: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    modalServiceMock = {
      openModal: jest.fn(),
      closeModal: jest.fn(),
    } as unknown as jest.Mocked<ModalService>;

    categoryServiceMock = {
      onCategoryCreated$: of(null), 
    } as unknown as jest.Mocked<CategoryService>;

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryModalComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal when a category is created', () => {
    categoryServiceMock.onCategoryCreated$.subscribe(() => {
      expect(modalServiceMock.closeModal).toHaveBeenCalled();
    });
  });

  it('should call openModal when openModal is called', () => {
    component.openModal();
    expect(modalServiceMock.openModal).toHaveBeenCalled();
  });
});