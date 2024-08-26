import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, ProductListComponent, MatRippleModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  title = 'Best Sellers';
  products: Product[] = [];
  highlightedProduct: Product;
  randomProduct: Product;
  randomProductLink: string;

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
      // not sure how to be sure that the highlighted product exists
      this.highlightedProduct = this.products.find((product) => product.name === 'Pearl Necklace');
      // make sure that the random product is not the same as the highlighted product
      const productsWithoutHighlighted = this.products.filter((product) => product.name !== 'Pearl Necklace');
      this.randomProduct = productsWithoutHighlighted[Math.floor(Math.random() * productsWithoutHighlighted.length)];
    });
  }

  navigateToRandomProduct() {
    this.router.navigate(['/product'], { queryParams: { id: this.randomProduct._id } });
  }
}
