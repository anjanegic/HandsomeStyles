import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatIconModule, FormsModule, CommonModule, MatInputModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: Product;
  selectedVariant: any = null;
  labelText: string = 'Choose Variant'; // Default label text
  quantity: number = 1; // Default quantity

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;
          this.selectedVariant = this.product.variants[0];
          this.setLabelText(); // Set the appropriate label text based on the variant type
        });
      }
    });
  }

  onVariantChange(variant: any) {
    this.selectedVariant = variant;
    // Additional logic for variant selection
  }

  setLabelText() {
    if (this.product.variants.length > 0) {
      const firstVariant = this.product.variants[0];
      if (firstVariant.color) {
        this.labelText = 'color';
      } else if (firstVariant.model) {
        this.labelText = 'phone model';
      } else {
        this.labelText = 'choose variant';
      }
    }
  }

  onQuantityChange(quantity: number) {
    this.quantity = quantity;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
