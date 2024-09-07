import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Product } from '../../../models/product';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatButtonModule, MatIconModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './product-edit-dialog.component.html',
  styleUrl: './product-edit-dialog.component.css',
})
export class ProductEditDialogComponent {
  productForm: FormGroup;
  categories: Category[];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProductEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { product: Product; categories: Category[] }) {
    this.categories = data.categories;
    this.productForm = this.fb.group({
      name: [data.product.name, []],
      description: [data.product.description, []],
      price: [data.product.price, []],
      category: [data.product.category, []],
      stock: [data.product.stock, []],
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
