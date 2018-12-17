import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$;
  
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  get ready(): boolean {
    return this.products$;
  }

  ngOnInit() {
  }

}
