import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  user: any;
  selectedSection: string = 'users';
  users: User[] = [];
  allUsers: User[] = [];

  constructor(private authService: AuthService, private router: Router, private productService: ProductService, private userService: UserService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getNotApprovedUsers().subscribe((users) => {
      this.users = users;
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  approveUser(user: User) {
    this.userService.approveUser(user._id).subscribe((data) => {
      this.fetchUsers();
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user._id).subscribe((data) => {
      this.fetchUsers();
    });
  }

  showSection(section: string): void {
    this.selectedSection = section;
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
