import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, OnInit} from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-create-article-modal',
  templateUrl: './create-article-modal.component.html',
  styleUrls: ['./create-article-modal.component.scss']
})
export class CreateArticleModalComponent implements OnInit{

  constructor(private readonly modalService: ModalService, private readonly articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.onArticleCreated$.subscribe(() => {
      this.modalService.closeModal();
    });
  }

  openModal() {
    this.modalService.openModal();
  }

}
