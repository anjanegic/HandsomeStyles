import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../models/product';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NgIf, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() title = '';
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  navigateToShopCollection() {
    this.router.navigate(['/collection'], { queryParams: { title: this.title } });
  }

  navigateToProduct(id: string) {
    this.router.navigate(['/product'], { queryParams: { id } });
  }
}
