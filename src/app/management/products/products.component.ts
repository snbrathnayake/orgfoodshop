import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../models/product-model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductModel[] = []; // client side filtering need to load all item to an array
  filteredProducts: ProductModel[] = [];
  categoryParam: string;
  subscription: Subscription;
  cart: any;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) {

    this.initializeProducts(); // first load allprod || filterdprod
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()) // next load cart details
      .subscribe(cart => this.cart = cart);
  }

  private initializeProducts() {
    this.productService
      .getAll()
      .switchMap((p: ProductModel[]) => {
        this.products = p;
        return this.route.queryParamMap;
      })
      .subscribe(param => {
        this.categoryParam = param.get('category');

        this.filteredProducts = (this.categoryParam) ?
          this.products.filter(p => p.category === this.categoryParam) :
          this.products;
      });
  }

  get ready() {
    const { filteredProducts } = this;
    return filteredProducts !== undefined; // for now zero product unacceptable
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
