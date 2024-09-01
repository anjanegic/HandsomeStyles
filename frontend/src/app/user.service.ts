import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Order } from './models/order';
import { Review } from './models/review';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    return this.http.post<User>(`${this.uri}/login`, data);
  }

  register(email: string, firstname: string, lastname: string, password: string) {
    const data = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
    };
    return this.http.post<User>(`${this.uri}/register`, data);
  }

  getUserName(userId: string) {
    return this.http.get<User>(`${this.uri}/getUserByUsername/${userId}`);
  }

  changeData(_id: string, email: string, firstname: string, lastname: string, address: string, city: string, country: string, postalCode: string, phone: string) {
    const data = {
      _id: _id,
      email: email,
      firstname: firstname,
      lastname: lastname,
      city: city,
      address: address,
      country: country,
      postalCode: postalCode,
      phone: phone,
    };
    return this.http.post<User>(`${this.uri}/change-data`, data);
  }

  removeFromWishlist(productId: string, userId: string) {
    const data = {
      userId,
      productId,
    };
    return this.http.post<User>(`${this.uri}/removeFromWishlist`, data);
  }

  addToWishlist(productId: string, userId: string) {
    const data = {
      productId,
      userId,
    };
    return this.http.post<User>(`${this.uri}/addToWishlist`, data);
  }

  addOrder(order: Order) {
    return this.http.post<Order>(`${this.uri}/addOrder`, order);
  }

  getOrders(userId: string) {
    return this.http.get<Order[]>(`${this.uri}/getOrders/${userId}`);
  }

  getReviews(userId: string) {
    return this.http.get<Review[]>(`${this.uri}/getReviews/${userId}`);
  }

  getUserById(userId: string) {
    return this.http.get<User>(`${this.uri}/getUserById/${userId}`);
  }

  deleteReview(reviewId: string) {
    return this.http.post<any>(`${this.uri}/deleteReview`, { reviewId });
  }
}
