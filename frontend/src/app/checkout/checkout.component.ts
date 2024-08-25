import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cartItems = this.getCartItems();
    console.log(this.cartItems);
  }

  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
