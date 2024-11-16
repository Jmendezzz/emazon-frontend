import { ResponseDTO } from '@/domain/models/Cart';
import { AbstractFormHandler } from '@/shared/abstracts/AbstractFormHandler';
import { ToastService } from '@/shared/services/ui/toast.service';
import { Component, Input} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormField } from '@/domain/models/Form';
import { Validators } from '@angular/forms';
import { ARTICLE_ADDED_TO_CART_ERROR_MESSAGE, ARTICLE_ADDED_TO_CART_MESSAGE, MIN_ADD_ARTICLE_QUANTITY } from '@/domain/utils/constants/Cart';
import { ModalService } from '@/shared/services/ui/modal.service';

@Component({
  selector: 'app-add-article-to-cart-form',
  templateUrl: './add-article-to-cart-form.component.html',
  styleUrls: ['./add-article-to-cart-form.component.scss']
})
export class AddArticleToCartFormComponent extends AbstractFormHandler<ResponseDTO>{

  @Input() articleId!: number;

  fields: FormField[] = [
    {
      name: 'quantity',
      type: 'number',
      label: 'Quantity',
      validators: [Validators.required, Validators.min(MIN_ADD_ARTICLE_QUANTITY)],
    },
  ]

  constructor(toastService: ToastService, private readonly cartService: CartService, private readonly modalService: ModalService) {
    super(toastService);
   }

   onSubmit({ quantity }: { quantity: number }){
    this.handleFormSubmit(
      () =>this.cartService.addArticleToCart({articleId: this.articleId, quantity}),
      ARTICLE_ADDED_TO_CART_MESSAGE,
      ARTICLE_ADDED_TO_CART_ERROR_MESSAGE,
      () => this.modalService.closeModal(`addArticleToCartModal-${this.articleId}`)
    )
   }

}
