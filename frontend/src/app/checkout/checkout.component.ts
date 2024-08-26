import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatBadgeModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  shippingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private authService: AuthService) {
    this.shippingForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, this.phoneValidator]],
    });
  }

  ngOnInit(): void {
    this.cartItems = this.getCartItems();
    console.log(this.cartItems);
    console.log(this.shippingForm);
  }

  onSubmit(): void {
    console.log('Form Submitted!', this.shippingForm.value);
  }

  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (phoneNumber && !phoneNumber.startsWith('+')) {
      return { phoneInvalid: true };
    }
    return null;
  }
}
