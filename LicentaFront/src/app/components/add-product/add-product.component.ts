
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productForm: FormGroup = new FormGroup({});
  path: String | undefined
  

  constructor(
    private productService: ProductService,
    private route: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      text: ['', [Validators.required, Validators.minLength(3)]],
      startingDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
    });
  }

  get product(): Product {
    const formValue = this.productForm.value;
   
    return { ...formValue};
  }


  onSubmit(): void {
    console.log(this.product);
    this.productService
      .addProduct(this.product)
      .subscribe((_) => {
        alert('Product added successfully!');
        this.route.navigate(['/home']);
      });


  }

  addProduct(): void {
    this.productService
    .addProduct(this.product)
      .subscribe((data: Product) => {
        alert('Product added successfully!');
        this.route.navigate(['/home']);
      });
  }

  cancel(): void {
    this.route.navigate(['/home']);
  }

  
  
  upload(event: any){
     const file = event.target.files[0]
     if(file){
      console.log(file);
     }
  }
}