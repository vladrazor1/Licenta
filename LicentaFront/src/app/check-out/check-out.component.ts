import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

      this.productForm = this.formBuilder.group({
        price: ['', [Validators.required, Validators.min(1)]],
      });

  }



  updateProduct(): void {
    this.productService
      .updateProduct(this.product)
      .subscribe((data: Product) => {
        alert('Congratulations on the auction done and good luck !');
        this.route.navigate(['/home']);
      });
  }

  sendEmail(){
      
  }
}
