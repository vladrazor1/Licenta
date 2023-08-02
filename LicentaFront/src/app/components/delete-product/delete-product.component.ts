import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modules/product';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  product = {} as Product;


  constructor(
    private productService: ProductService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.product.id = params['id'];
    });
  }

  deleteProduct(): void {
    this.productService
      .deleteProduct(this.product.id)
      .subscribe((data: Product) => {
        alert('Product deleted successfully!');
        this.route.navigate(['/home']);
      });
  }

  cancel(): void {
    this.route.navigate(['/home']);
  }
}
