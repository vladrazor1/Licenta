import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../modules/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent {


  myDataArray: Product[] = [];
  searchValue = '';
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });
  
  categoryId = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private sharedService: UserService,
    private route: Router,
    private fb: FormBuilder,
    
  ) {}

  ngOnInit(): void {
    let categoryId =

    this.productService
      .getProductsWithSpecificCategory(this.categoryId)
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
