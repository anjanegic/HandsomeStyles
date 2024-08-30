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
import { Review } from '../models/review';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, MatDialogModule, ProductListComponent, RouterModule, MatExpansionModule, CommonModule, MatTabsModule, MatCardModule, MatTabsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit {
  user: any;
  selectedSection: string = 'account';
  maskedpassword: string;
  products: Product[] = [];
  orders: Order[] = [];
  reviews: Review[] = [];
  productsReviews: { [key: string]: Product } = {};
  currentIndex: number = 0;
  intervalId: any;

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
    this.fetchReviews();
  }

  ngOnDestroy() {
    this.stopAutoSlide(); // Zaustavi interval kada komponenta nije više u upotrebi
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
    }, 3000); // Promeni tab svake 3 sekunde
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.currentIndex = event.index;
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
    });
  }

  fetchReviews(): void {
    this.userService.getReviews(this.authService.getUser()._id).subscribe((reviews) => {
      this.reviews = reviews;
      try {
        const productIds = [...new Set(this.reviews.map((review) => review.productId))];

        for (const id of productIds) {
          this.productService.getProductById(id).subscribe((product) => {
            this.productsReviews[id] = product;
          });
        }
      } catch (error) {
        console.error('Greška prilikom dobijanja proizvoda:', error);
      }
    });
  }

  getProductName(productId: string): string {
    return this.productsReviews[productId]?.name || 'Nepoznat proizvod';
  }

  formatDate(dateV: Date) {
    const date = new Date(dateV);
    const options: Intl.DateTimeFormatOptions = {
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
