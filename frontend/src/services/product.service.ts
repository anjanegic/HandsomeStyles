import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../app/models/product';
import { Category } from '../app/models/category';

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

  getReviews(productId: string) {
    return this.http.get<any[]>(`${this.uri}/getReviews/${productId}`);
  }

  submitReview(review: any) {
    return this.http.post<any>(`${this.uri}/submitReview`, review);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.uri}/getCategories`);
  }

  addProduct(product: any) {
    return this.http.post<any>(`${this.uri}/addProduct`, product);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.uri}/deleteProduct/${productId}`);
  }

  addVariant(product: Product) {
    return this.http.post(`${this.uri}/addVariant`, product);
  }

  updateTags(product: Product) {
    return this.http.put(`${this.uri}/updateTags`, product);
  }

  updateProduct(productId: string, product: any) {
    return this.http.put(`${this.uri}/updateProduct/${productId}`, product);
  }
}
