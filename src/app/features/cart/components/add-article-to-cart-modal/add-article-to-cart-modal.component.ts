import { BaseModalComponent } from '@/shared/abstracts/AbstractModalComponent';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-article-to-cart-modal',
  templateUrl: './add-article-to-cart-modal.component.html',
  styleUrls: ['./add-article-to-cart-modal.component.scss']
})
export class AddArticleToCartModalComponent extends BaseModalComponent implements OnInit {
  @Input() articleId!: number
  constructor(
    modalService: ModalService,
  ) {
    super(modalService);
  }

  override ngOnInit(): void {
    this.modalId = `addArticleToCartModal-${this.articleId}`;
    super.ngOnInit();
  }

}
