import { Component } from '@angular/core';
import { Product } from '../modules/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent {
  myDataArray: Product[] = [];
  searchValue = '';
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  constructor(
    private productService: ProductService,
    private sharedService: UserService,
    private route: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.productService
      .getMyProducts()
      .subscribe((data: Product[]) => (this.myDataArray = data));
  }

  mineProduct(product: Product): boolean {
    if (product.userId == this.sharedService.getUserId()) {
      return true;
    }
    return false;
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe((data: Product) => {
      alert('Product deleted successfully!');
      location.reload();
    });
  }

  isLoggedIn(){
    return this.sharedService.isLoggedIn();
  }


  fatcheData(): void{
    this.productService.getProductByNav(this.searchValue).subscribe((myDataArray)=>{
       this.myDataArray= myDataArray;
    })
  }

  onSearchSubmit(): void{
    console.log('search value ' + localStorage.getItem('searchValue'));
    this.searchValue= this.searchForm.value.searchValue ?? '';
    this.fatcheData();
  }
}