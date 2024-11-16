import { CartArticleDTO } from '@/domain/models/Cart';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.scss'],
})
export class CartItemCardComponent {
  @Input() cartArticle!: CartArticleDTO;
  @Output() itemDeleted = new EventEmitter<CartArticleDTO>();

  constructor(private readonly cartService: CartService) {}

  handleDelete(): void {
    this.cartService.deleteCartArticle(this.cartArticle.article.id).subscribe({
      next: () => {
        this.itemDeleted.next(this.cartArticle);
      },
    });
  }
}
