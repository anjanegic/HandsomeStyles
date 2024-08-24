import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ChangeDataDialogComponent } from '../change-data-dialog/change-data-dialog.component';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, MatDialogModule, ProductListComponent, RouterModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit {
  user: any;
  selectedSection: string = 'account';
  maskedpassword: string;
  products: Product[] = [];

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) {
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

  changeData(): void {}

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
