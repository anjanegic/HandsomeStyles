import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ProductListComponent } from '../product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ProductListComponent, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent {
  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) {}

  title: string = '';
  products: Product[] = [];
  sortedProducts: Product[] = [];
  selectedSort: string = '';

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.title = params.get('title') || '';
      this.fetchProducts();
    });
  }

  fetchProducts() {
    this.productService.getProductsFromCollection(this.title).subscribe((data: Product[]) => {
      this.products = data;
      this.sortProducts(this.selectedSort);
    });
  }

  onSortChange(value: string) {
    this.sortProducts(value);
  }

  sortProducts(sortOption: string) {
    this.selectedSort = sortOption;
    this.sortedProducts = [...this.products];
    switch (sortOption) {
      case 'price-asc':
        this.sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        this.sortedProducts = [...this.products]; // Reset to unsorted products
        break;
    }
    console.log(this.sortedProducts); // Debug poruka
  }
}
