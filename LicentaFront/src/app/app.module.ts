import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './autentication/login/login.component';
import { RegisterComponent } from './autentication/register/register.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ShowAllProductComponent } from './components/show-all-product/show-all-product.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyPostsComponent } from './my-posts/my-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    DeleteProductComponent,
    EditProductComponent,
    ShowAllProductComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MyPostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
