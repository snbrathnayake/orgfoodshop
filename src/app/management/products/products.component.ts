import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../models/product-model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = []; // client side filtering need to load all item to an array
  filteredProducts: ProductModel[] = [];
  categoryParam: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart(); // next load cart details
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .switchMap((p: ProductModel[]) => {
        this.products = p;
        return this.route.queryParamMap;
      })
      .subscribe(param => {
        this.categoryParam = param.get('category');
        this.applyFilter();
      });
  }

  get ready() {
    // for now zero product unacceptable
    return this.filteredProducts && this.cart$;
  }

  private applyFilter() {
    this.filteredProducts = (this.categoryParam) ?
      this.products.filter(p => p.category === this.categoryParam) :
      this.products;
  }

}
