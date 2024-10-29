import { ModalService } from '@/shared/services/ui/modal.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent {

  constructor(private readonly modalService: ModalService) { }

  openModal() {
    this.modalService.openModal();
  }

}
