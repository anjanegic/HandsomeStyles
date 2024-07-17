import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

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
}
