import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product-model';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: ProductModel = {} as ProductModel;
  _id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategoriesData();
    this._id = this.route.snapshot.paramMap.get('id'); // get value of actived url @param:/_id
    const { pid } = this;

    if (pid) {
      this.productService.getProductById(pid)
        .take(1) // no need to unsubcribe
        .subscribe((p: ProductModel) => {
          this.product = p;
        });
    }
  }

  save(productForm: ProductModel) {
    const { pid } = this;
    if (pid) {
      this.productService.updateProduct(pid, productForm);
    } else { this.productService.create(productForm); }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    const { pid } = this;
    if (confirm('Are you sure you want to delete this product.?')) {
      this.productService.deleteProductById(pid);
      this.router.navigate(['/admin/products']);
    }
  }

  get pid(): string {
    return this._id;
  }

  ngOnInit() {
  }

}
