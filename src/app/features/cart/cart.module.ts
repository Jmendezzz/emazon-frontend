import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { AddArticleToCartFormComponent } from './components/add-article-to-cart-form/add-article-to-cart-form.component';
import { AtomsModule } from '@/components/atoms/atoms.module';
import { MoleculesModule } from '@/components/molecules/molecules.module';
import { OrganismsModule } from '@/components/organisms/organisms.module';
import { CartService } from './services/cart.service';
import { AddArticleToCartModalComponent } from './components/add-article-to-cart-modal/add-article-to-cart-modal.component';
import { ListCustomerCartItemsComponent } from '@/components/pages/cart/list-customer-cart-items/list-customer-cart-items.component';
import { CartItemsListComponent } from './components/cart-items-list/cart-items-list.component';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';
import { SharedModule } from '@/shared/shared.module';


@NgModule({
  declarations: [
    AddArticleToCartFormComponent,
    AddArticleToCartModalComponent,
    ListCustomerCartItemsComponent,
    CartItemsListComponent,
    CartItemCardComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    SharedModule
    ],
  providers: [CartService],
  exports: [AddArticleToCartModalComponent, ListCustomerCartItemsComponent]
})
export class CartModule { }
