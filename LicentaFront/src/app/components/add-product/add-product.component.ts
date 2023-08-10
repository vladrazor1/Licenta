import { Category } from './../../modules/category';
import { Component } from '@angular/core';
// import { AngularFireStorage } from "@angular/fire/storage";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product.service';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup = new FormGroup({});
  path: String | undefined;
  defaultCategory = 'Furniture';

  constructor(
    private productService: ProductService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.minLength(3)]],
      startingDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      
    });
  }

  get product(): Product {
    const formValue = this.productForm.value;
    console.log(formValue)
    return { ...formValue };
  }

  onSubmit(): void {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe((_) => {
      alert('Product added successfully!');
      this.route.navigate(['/home']);
    });
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

  // title = "cloudsSorage";
  // selectedFile: File = null;
  // fb;
  // downloadURL: Observable<string>;

  onFileSelected(event: any) {
    // var n = Date.now();
    // const file = event.target.files[0];
    // const filePath = `RoomsImages/${n}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(`RoomsImages/${n}`, file);
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe(url => {
    //         if (url) {
    //           this.fb = url;
    //         }
    //         console.log(this.fb);
    //       });
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {
    //       console.log(url);
    //     }
    //     });
  }
}
