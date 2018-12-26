import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: ProductModel;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  // if there no product in cart: event for "add-cart" big button
  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
