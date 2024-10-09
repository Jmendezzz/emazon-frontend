import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/ui/modal.service';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss']
})
export class CreateCategoryModalComponent implements OnInit {

  constructor(private modalService: ModalService) {
   }

  ngOnInit(): void {
  }
  openModal() {
    this.modalService.openModal();
  }

}
