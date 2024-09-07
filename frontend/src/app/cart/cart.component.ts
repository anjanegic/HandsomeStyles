// cart.component.ts
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service'; // Importujte servis
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('sidenav', { static: false }) sidenavElementRef!: ElementRef;
  cartItems: any[] = [];
  isOpen: boolean = false;
  totalPrice: number;

  constructor(private cartService: CartService, private router: Router) {}

  ngAfterViewInit(): void {
    this.sidenav?.openedChange.subscribe((opened) => (this.isOpen = opened));
    this.sidenav?.openedStart.subscribe(() => (this.isOpen = true));
  }

  ngOnInit() {
    this.cartService.getCartOpenedEvent().subscribe(() => {
      this.openSidenav();
      this.refreshCart();
    });
  }

  loadCartFromLocalStorage() {
    const items = localStorage.getItem('cartItems');
    if (items) {
      this.cartItems = JSON.parse(items);
      console.log('Cart items loaded from localStorage:', this.cartItems);
    }
  }

  refreshCart() {
    this.loadCartFromLocalStorage();
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    localStorage.setItem('subtotalPrice', this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2));
    localStorage.setItem('shippingPrice', '5');
    localStorage.setItem('totalPrice', (this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) + 5).toFixed(2));

    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  updateTotalPrice() {
    this.totalPrice = this.getTotalPrice();
  }

  updateQuantity(index: number, quantity: number) {
    this.cartItems[index].quantity = quantity;
    this.saveCartToLocalStorage();
  }

  saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.saveCartToLocalStorage();
    this.cartService.updateCartBadge();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartToLocalStorage();
    this.updateTotalPrice();
    this.cartService.updateCartBadge();
  }

  increaseQuantity(index: number) {
    if (this.cartItems[index].quantity < 10) {
      this.cartItems[index].quantity++;
      this.saveCartToLocalStorage();
      this.updateTotalPrice();
      this.cartService.updateCartBadge();
    }
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.saveCartToLocalStorage();
      this.updateTotalPrice();
      this.cartService.updateCartBadge();
    }
  }

  checkout() {
    this.sidenav.close();
    this.router.navigate(['/checkout']);
  }

  toggleSidenav() {
    if (this.sidenav.opened) {
      this.closeSidenav();
    } else {
      this.openSidenav();
    }
  }

  openSidenav() {
    this.sidenav.open();
    this.refreshCart();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  onContainerClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
