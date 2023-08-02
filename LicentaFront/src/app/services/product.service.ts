import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../modules/product';
import { API_URL } from '../constants';
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

getProduct(id?: number){
  return this.httpClient.get<Product>( API_URL + '/' + id)
}

addProduct(product : Product) : Observable<Product>{
  return this.httpClient.post<Product>(API_URL, product)
}

updateProduct(product : Product) : Observable<Product> {
  return this.httpClient.put<Product>(API_URL + '/' + product.id, product )
}

deleteProduct(id?: number) : Observable<Product>{
  return this.httpClient.delete<Product>( API_URL + '/' + id)
}
}
