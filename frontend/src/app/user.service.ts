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
}
