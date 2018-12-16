import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { ProductModel } from '../models/product-model';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: ProductModel) {
    return this.db.list('/products').push(product);
  }

  getAll(): FirebaseListObservable<ProductModel[]> {
    return this.db.list('/products');
  }

  getProductById(productId: string): FirebaseObjectObservable<ProductModel[]> {
    return this.db.object('/products/' + productId);
  }

  updateProduct(productId: string , product: ProductModel): any {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProductById(productId: string): any {
    return this.db.object('/products/' + productId).remove();
  }
}
