import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, ProductListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  products: string[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  navigateToShopPhoneCases() {
    this.router.navigate(['/login']);
  }

  onAddToCart(product: any) {
    console.log(product);
  }

  fetchProducts() {
    // fetch
    this.products = ['Samsung', 'Apple', 'Huawei', 'LG', 'Sony'];
  }
}
