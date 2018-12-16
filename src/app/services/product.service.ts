import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductModel } from '../models/product-model';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createCategory(product: ProductModel) {
    return this.db.list('/products').push(product);
  }
}
