import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButton, MatSelectModule, MatSelectModule, MatFormFieldModule, FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product: Product;

  selectedVariant: any = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        console.log(productId);
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;
          this.selectedVariant = this.product.variants[0];
        });
      }
    });
  }
  onVariantChange(variant: any) {
    this.selectedVariant = variant;
    // Additional logic for variant selection
  }

  addToCart() {
    // Logic to add product to cart
    console.log('Added to cart:', this.selectedVariant);
  }
}
