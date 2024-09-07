import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../models/product';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() page = '';
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private cd: ChangeDetectorRef) {}

  navigateToShopCollection() {
    this.router.navigate(['/collection'], { queryParams: { title: this.page, products: JSON.stringify(this.products) } });
  }

  navigateToProduct(id: string) {
    this.router.navigate(['/product'], { queryParams: { id } });
  }

  getUser() {
    return this.authService.getUser();
  }

  removeFromWishlist(event: Event, id: string) {
    event.stopPropagation();
    this.userService.removeFromWishlist(id, this.getUser()._id).subscribe(() => {
      this.products = this.products.filter((product) => product._id !== id);

      const updatedUser = {
        ...this.getUser(),
        wishlist: this.getUser().wishlist.filter((id) => id !== id),
      };
      this.authService.patchUser(updatedUser);
      this.cd.markForCheck();
    });
  }
}
