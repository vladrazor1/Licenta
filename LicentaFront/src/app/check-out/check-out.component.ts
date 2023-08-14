import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../modules/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  product = {} as Product;
  productForm: FormGroup = new FormGroup({});

  prodForComp = {} as Product;
  oldPrice = 0;

  constructor(
    private productService: ProductService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.product.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.productService
      .getProduct(this.product.id)
      .subscribe((data: Product) => (this.product = data));

    this.productService
      .getProduct(this.product.id)
      .subscribe((data: Product) => (this.prodForComp = data));

    this.productForm = this.formBuilder.group({
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  updateProduct(): void {
    if (this.product.price > this.prodForComp.price) {
      this.productService
        .updateProduct(this.product)
        .subscribe((data: Product) => {
          this.product = data;
          alert('Congratulations on the auction done and good luck !');
          this.route.navigate(['/home']);
        });
      this.productService
        .sendEmail(this.product.title, this.product.price)
        .subscribe();
    } else {
      alert('The price must be greater than the last price!');
    }
  }

  imageCat(product: Product){
    if (product.categoryId == 1) {
      return true;
    }
    return false;
  }
}
