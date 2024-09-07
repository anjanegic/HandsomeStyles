import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Importujte CartService

@Component({
  selector: 'app-order-conformation',
  standalone: true,
  imports: [],
  templateUrl: './order-conformation.component.html',
  styleUrl: './order-conformation.component.css',
})
export class OrderConformationComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('subtotalPrice');
    localStorage.removeItem('shippingPrice');
    localStorage.removeItem('totalPrice');
    this.cartService.notifyCartUpdated();
  }
}
