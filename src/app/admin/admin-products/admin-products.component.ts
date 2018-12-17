import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { ProductModel } from '../../models/product-model';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: ProductModel[];

  subcription: Subscription;
  tableResourse: DataTableResource<ProductModel>;
  items: ProductModel[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subcription = this.productService.getAll()
      .subscribe(p => {
        this.products = p;
        this.initializeTable(p);
      });
  }

  private initializeTable(product: ProductModel[]) {
    this.tableResourse = new DataTableResource(product);
    this.tableResourse.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResourse.count()
      .then(count => this.itemCount = count);
  }

  // refresh page => then load all the records
  reloadItems(params) {
    if (!this.tableResourse) { return; }

    this.tableResourse.query(params)
    .then(items => this.items = items);
  }

  get ready(): boolean {
    return this.tableResourse !== undefined;
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(
        p => p.title.toLowerCase()
            .includes(query.toLowerCase())) : this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  ngOnInit() {
  }

}
