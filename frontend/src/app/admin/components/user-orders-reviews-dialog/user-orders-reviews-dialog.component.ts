import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Order } from '../../../models/order';
import { Review } from '../../../models/review';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../models/product';
import { ProductListComponent } from '../../../product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

enum OrderStatus {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  ACCEPTED = 'accepted',
}

@Component({
  selector: 'app-user-orders-reviews-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    NgIf,
    MatDialogModule,
    ProductListComponent,
    RouterModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
  ],
  templateUrl: './user-orders-reviews-dialog.component.html',
  styleUrl: './user-orders-reviews-dialog.component.css',
})
export class UserOrdersReviewsDialogComponent implements OnInit {
  user: User;
  orders: Order[] = [];
  reviews: Review[] = [];
  productsReviews: { [key: string]: Product } = {};
  orderStatuses = [
    { value: OrderStatus.PENDING, viewValue: 'Pending' },
    { value: OrderStatus.DELIVERED, viewValue: 'Delivered' },
    { value: OrderStatus.CANCELLED, viewValue: 'Cancelled' },
    { value: OrderStatus.ACCEPTED, viewValue: 'Accepted' },
  ];

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public productService: ProductService,
    public dialogRef: MatDialogRef<UserOrdersReviewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.fetchOrders();
    this.fetchReviews();
  }

  onSave(): void {
    this.dialogRef.close(this.data.user);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  fetchOrders(): void {
    this.userService.getOrders(this.user._id).subscribe((orders) => {
      this.orders = orders.sort((a, b) => new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime());
    });
  }

  fetchReviews(): void {
    this.userService.getReviews(this.user._id).subscribe((reviews) => {
      this.reviews = reviews;
      this.reviews = this.reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

  setOrderStatus(order: Order, status: OrderStatus) {
    order.status = status;
    this.userService.updateOrderStatus(order._id, status).subscribe(() => {
      this.orders = this.orders.sort((a, b) => new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime());
    });
  }

  onContainerClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
