import { Component } from '@angular/core';
import { Product } from '../modules/product';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { of, tap, delay } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  myDataArray: Product[] = [];

  constructor(
    private productService: ProductService,
    private sharedService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
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
}
