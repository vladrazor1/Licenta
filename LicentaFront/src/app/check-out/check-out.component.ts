import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../modules/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {


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
  }
}
