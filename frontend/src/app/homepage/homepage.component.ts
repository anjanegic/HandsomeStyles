import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, ProductListComponent, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  title = 'Best Sellers';
  products: Product[] = [];
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  navigateToShopPhoneCases() {
    this.router.navigate(['/collection'], { queryParams: { title: 'Phone Cases' } });
  }

  onAddToCart(product: any) {
    console.log(product);
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.slice(0, 8);
    });
  }
}
