
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  product = {} as Product;
  productForm: FormGroup = new FormGroup({});

  constructor(
    private productService: ProductService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.product.id = params['id'];
    });
  }

  


  ngOnInit(): void {
    this.productService
      .getProduct(this.product.id)
      .subscribe((data: Product) => (this.product = data));

      this.productForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required, Validators.min(1)]],
        text: ['', [Validators.required, Validators.minLength(3)]],
        startingDate: ['', [Validators.required]],
        expirationDate: ['', [Validators.required]],
      });
  }

  updateProduct(): void {
    this.productService
      .updateProduct(this.product)
      .subscribe((data: Product) => {
        alert('Product modified successfully!');
        this.route.navigate(['/my-posts']);
      });
  }

  cancel(): void {
    this.route.navigate(['/my-posts']);
  }

}