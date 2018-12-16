import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product-model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoryService: CategoryService ,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategoriesData();
   }

  save(productForm: ProductModel) {
   this.productService.createCategory(productForm);
  }

  ngOnInit() {
  }

}
