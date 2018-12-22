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
  }

  async ngOnInit() {

    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);

    this.initializeProducts();

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
    return this.filteredProducts.length > 0; // for now zero product unacceptable
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
