import { Component, Input } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: ProductModel;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  get qtyInCart() {

    if (!this.shoppingCart) { return 0; }
    // items => database node { product , quantity }
    const item = this.shoppingCart.items[this.product.$key];
    return (item) ? item.quantity : 0;
  }

}
