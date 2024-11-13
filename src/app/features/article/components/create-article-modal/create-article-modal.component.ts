import { Component } from '@angular/core';
import { ModalService } from '@/shared/services/ui/modal.service';
import { ArticleService } from '@/features/article/services/article.service';
import { BaseModalComponent } from '@/shared/abstracts/AbstractModalComponent';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss'],
})
export class CreateArticleModalComponent extends BaseModalComponent {
  constructor(
    modalService: ModalService,
    private readonly articleService: ArticleService
  ) {
    super(modalService);
    this.modalId = 'createArticleModal'; 
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.articleService.onArticleCreated$.subscribe(() => {
      this.closeModal();
    });
  }
}
