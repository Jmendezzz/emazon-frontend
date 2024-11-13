import { Component } from '@angular/core';
import { ModalService } from '@/shared/services/ui/modal.service';
import { CategoryService } from '@/features/category/services/category.service';
import { BaseModalComponent } from '@/shared/abstracts/AbstractModalComponent';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss']
})
export class CreateCategoryModalComponent extends BaseModalComponent{
  override modalId: string = 'createCategoryModal';
  constructor(
    modalService: ModalService,
    private readonly categoryService: CategoryService
  ) {
    super(modalService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.categoryService.onCategoryCreated$.subscribe(() => {
      this.closeModal();
    });
  }
}
