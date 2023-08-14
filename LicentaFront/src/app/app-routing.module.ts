import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './autentication/login/login.component';
import { RegisterComponent } from './autentication/register/register.component';
import { ShowAllProductComponent } from './components/show-all-product/show-all-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CategoryProductsComponent } from './category-products/category-products.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'show-all-product', component: ShowAllProductComponent },
  { path: 'eddit/:id', component: EditProductComponent },
  { path: 'show-all-product/delete/:id', component: DeleteProductComponent },
  { path: 'show-all-product/add', component: AddProductComponent },
  { path: 'my-posts', component: MyPostsComponent },
  { path: 'check-out/:id', component: CheckOutComponent },
  { path: 'my-profile', component: MyProfileComponent },
  {
    path: 'category-products/:categoryId',
    component: CategoryProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
