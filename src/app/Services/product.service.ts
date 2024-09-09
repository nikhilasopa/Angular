

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../interfaces/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'https://localhost:44355';
  http = inject(HttpClient);
  constructor() {}

  getAllProducts() {
    // console.log('getAllEmployee', localStorage.getItem('token'));
    return this.http.get<IProducts[]>(this.apiUrl + '/api/Products1');
  }
  createProduct(product: IProducts) {
    return this.http.post(this.apiUrl + '/api/Products1', product);
  }
  getproduct(productId: number) {
    return this.http.get<IProducts>(
      this.apiUrl + '/api/Products1/' + productId
    );
  }
  updateProduct(productId: number, product: IProducts) {
    return this.http.put<IProducts>(
      this.apiUrl + '/api/Products1/' + productId, product);
  }
  deleteProduct(productId: number) {
    return this.http.delete(this.apiUrl + '/api/Products1/' + productId);
  }
}
