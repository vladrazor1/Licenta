import { Category } from './../../modules/category';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product.service';
import { map, finalize, every } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup = new FormGroup({});
  selectedFile: any;
  image: string | ArrayBuffer | null | undefined;

  constructor(
    private productService: ProductService,
    private route: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(3)]],
      startingDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      // image: [''],
    });
  }

  get product(): Product {
    const formValue = this.productForm.value;
    return { ...formValue };
  }

  async onSubmit(): Promise<void> {

    this.productService.addProduct(this.product).subscribe((_) => {
      alert('Product added successfully!');
    });

    this.route.navigate(['/home']);
  }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe((data: Product) => {
      alert('Product added successfully!');
      this.route.navigate(['/home']);
    });
  }

  cancel(): void {
    this.route.navigate(['/home']);
  }

  onFileSelected(event: any) {
    // console.log(event);

    // this.selectedFile = <File>event.target.files[0];

    // var myReader: FileReader = new FileReader();


    // myReader.readAsDataURL(this.selectedFile);

    // myReader.onloadend = (e) => {
    //   this.image = myReader.result;
    //   this.productForm.value.image = this.image;
    //   console.log(this.productForm.value.image);
    //   console.log(this.image);
    // };
  }

}
