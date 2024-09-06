import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-edit-dialog',
  standalone: true,
  imports: [],
  templateUrl: './product-edit-dialog.component.html',
  styleUrl: './product-edit-dialog.component.css',
})
export class ProductEditDialogComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProductEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      price: [data.price, Validators.required],
      category: [data.category, Validators.required],
      stock: [data.stock, Validators.required],
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
