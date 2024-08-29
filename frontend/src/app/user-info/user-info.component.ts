import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeDataDialogComponent } from '../change-data-dialog/change-data-dialog.component';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserService } from '../user.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, MatDialogModule, ProductListComponent, RouterModule, MatExpansionModule, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit {
  user: any;
  selectedSection: string = 'account';
  maskedpassword: string;
  products: Product[] = [];
  orders: Order[] = [];

  constructor(private authService: AuthService, private router: Router, private productService: ProductService, private userService: UserService) {
    this.user = this.authService.getUser();
    this.maskedpassword = '*'.repeat(this.user.password.length);
  }

  ngOnInit() {
    console.log(this.authService.getUser());
    const products = [];
    for (const id of this.authService.getUser().wishlist) {
      this.productService.getProductById(id).subscribe((product) => products.push(product));
    }
    this.products = products;
    this.fetchOrders();
  }

  showSection(section: string): void {
    this.selectedSection = section;
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChangeDataDialogComponent, {
      width: '45vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  fetchOrders(): void {
    this.userService.getOrders(this.authService.getUser()._id).subscribe((orders) => {
      this.orders = orders;

      console.log(this.orders);
    });
  }

  formatDate(dateV: Date) {
    const date = new Date(dateV);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  getOrderItems(order: Order) {
    let numberOfItems = 0;
    for (const item of order.orderItems) {
      numberOfItems += item.quantity;
    }
    return numberOfItems;
  }

  changeData(): void {}

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
