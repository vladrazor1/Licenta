import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../modules/product';
import { API_URL, API_URL_Mail } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private httpClient : HttpClient) { }

  //Crud

getProducts(){
  return this.httpClient.get<Product[]>( API_URL)
}

getMyProducts(){
  return this.httpClient.get<Product[]>( API_URL + '/id')
}

getProductsWithSpecificCategory(categoryId: number){
  return this.httpClient.get<Product[]>( API_URL + '/category/'+ categoryId)
}

getProduct(id?: number){
  return this.httpClient.get<Product>( API_URL + '/' + id)
}

getProductByNav(searchValue: string): Observable<Product[]>{
  return this.httpClient.get<Product[]>(API_URL + '/title/' + searchValue)
}

addProduct(product : Product) : Observable<Product>{
  console.log(product)
  return this.httpClient.post<Product>(API_URL, product)
}

updateProduct(product : Product) : Observable<Product> {
  return this.httpClient.put<Product>(API_URL + '/' + product.id, product )
}

deleteProduct(id?: number) : Observable<Product>{
  return this.httpClient.delete<Product>( API_URL + '/' + id)
}

sendEmail(productName: string, productPrice: number): Observable<void>{
  return this.httpClient.post<void>(API_URL_Mail, {productName: productName, productPrice: productPrice});
}

}