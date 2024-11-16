import { Article } from '@/domain/models/Article';
import { AuthService } from '@/features/authentication/services/auth.service';
import { ModalService } from '@/shared/services/ui/modal.service';
import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: Article;

  constructor(private readonly authService: AuthService, private readonly modalService: ModalService, private readonly router:Router) { }

  handleAddToCart(){
    if(this.authService.userDetails() == null){
      this.router.navigate(['/login']);
      return;
    }
    this.modalService.openModal(`addArticleToCartModal-${this.article.id}`);
  }

}
