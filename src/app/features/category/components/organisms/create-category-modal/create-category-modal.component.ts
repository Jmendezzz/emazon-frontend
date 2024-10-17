import { Component, OnInit} from '@angular/core';
import { ModalService } from 'src/app/shared/services/ui/modal.service';
import { CategoryService } from '../../../services/category.service';

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
