import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductModel } from '../models/product-model';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: ProductModel) {
   this.updateItemQuantity(product , +1);
  }

  async removeFromCart(product: ProductModel) {
    this.updateItemQuantity(product , -1);
  }

  private async updateItemQuantity(product: ProductModel , change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product);

    item$.take(1)
      .subscribe(item => {
        item$.update({
          product: product,
          quantity: (item.quantity || 0) + change
        });
    });
  }

  // return cart object
  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  // create new cart if not exsisted in database
  private create() {
    return this.db.list('/shopping-carts')
      .push({
        dateCreated: new Date().getTime()
      });
  }

  // return cart id when clicking the addToCart button.
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cart_bucket_id');

    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cart_bucket_id', result.key); // result.key => $key of shopping-cart added
    return result.key;

  }

  // return product object under the ( cart => product )
  private getItem(id: string, product: ProductModel) {
    return this.db.object('/shopping-carts/' + id + '/items/' + product.$key);
  }


}
