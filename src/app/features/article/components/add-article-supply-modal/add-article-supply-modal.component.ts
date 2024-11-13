import { BaseModalComponent } from '@/shared/abstracts/AbstractModalComponent';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, Input} from '@angular/core';
import { SupplyService } from '../../services/supply.service';

@Component({
  selector: 'app-add-article-supply-modal',
  templateUrl: './add-article-supply-modal.component.html',
  styleUrls: ['./add-article-supply-modal.component.scss']
})
export class AddArticleSupplyModalComponent extends BaseModalComponent {
  @Input() articleId!: number;

  constructor(modalService: ModalService, private readonly supplyService: SupplyService) {
    super(modalService);
    this.modalId = 'addArticleSupplyModal';
   }
   override ngOnInit(): void {
    super.ngOnInit();

    this.supplyService.onSupplyCreated$.subscribe(() => {
      this.closeModal();
    });
  }
}
