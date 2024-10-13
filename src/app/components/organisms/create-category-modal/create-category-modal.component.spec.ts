import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoryModalComponent } from './create-category-modal.component';
import { ModalService } from 'src/app/shared/services/ui/modal.service';

jest.mock('src/app/shared/services/ui/modal.service');

describe('CreateCategoryModalComponent', () => {
  let component: CreateCategoryModalComponent;
  let fixture: ComponentFixture<CreateCategoryModalComponent>;
  let mockModalService: jest.Mocked<ModalService>;

  beforeEach(async () => {
    mockModalService = new ModalService() as jest.Mocked<ModalService>;

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryModalComponent],
      providers: [
        { provide: ModalService, useValue: mockModalService }
      ]
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

  it('should call openModal on the modal service when openModal is called', () => {
    const openModalSpy = jest.spyOn(mockModalService, 'openModal');
    component.openModal();
    expect(openModalSpy).toHaveBeenCalled();
  });
});