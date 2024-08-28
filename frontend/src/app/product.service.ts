import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  uri = 'http://localhost:4000/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.uri}/getAllProducts`);
  }

  getProductsFromCollection(collection: string) {
    return this.http.post<Product[]>(`${this.uri}/getProductsFromCollection`, { collection });
  }

  getProductById(_id: string) {
    return this.http.get<Product>(`${this.uri}/getProductById/${_id}`);
  }

  search(query: string) {
    return this.http.get<any[]>(`${this.uri}/search?q=${query}`);
  }
}
