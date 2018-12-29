import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductModel } from '../models/product-model';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: ProductModel) {
    this.updateItem(product, +1);
  }

  async removeFromCart(product: ProductModel) {
    this.updateItem(product, -1);
  }

  // return ShoppingCart new Object();
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map((cart: any) => {
        // here check empty item obj
        return new ShoppingCart(cart.items);
      });
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
    // localStorage.removeItem('cart_id');
  }

  private async updateItem(product: ProductModel, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);

    item$.take(1)
      .subscribe(item => {
        const qty = (item.quantity || 0) + change;
        if (qty === 0) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: qty
          });
        }
      });
  }

  // create new cart if not exsisted in database
  private create() {
    return this.db.list('/shopping-carts')
      .push({
        dateCreated: new Date().getTime()
      });
  }

  /**
   *
   * return cart id when clicking the addToCart button.
   * check the database cart-bucket $key is exsisting with localStorage value
   */
  private async getOrCreateCartId(): Promise<string> {
    const localId = localStorage.getItem('cart_id');

    if (localId) { return localId; }

    const result = await this.create();
    localStorage.setItem('cart_id', result.key); // result.key => $key of shopping-cart added
    return result.key;

  }
  // return product object under the ( cart => product )
  private getItem(id: string, key: string) {
    return this.db.object('/shopping-carts/' + id + '/items/' + key);
  }


}
