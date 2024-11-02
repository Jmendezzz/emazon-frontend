import { CategoryService } from '@/features/category/services/category.service';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss']
})
export class CreateCategoryModalComponent implements OnInit {

  constructor(private readonly modalService: ModalService, private readonly categoryService: CategoryService) {
   }

  ngOnInit(): void {
    this.categoryService.onCategoryCreated$.subscribe(() => {
      this.modalService.closeModal();
    });
  }

  openModal() {
    this.modalService.openModal();
  }

}
