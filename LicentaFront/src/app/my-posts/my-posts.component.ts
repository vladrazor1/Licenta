import { Component } from '@angular/core';
import { Product } from '../modules/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent {
  myDataArray: Product[] = [];

  constructor(
    private productService: ProductService,
    private sharedService: UserService,
    private route: Router
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
}