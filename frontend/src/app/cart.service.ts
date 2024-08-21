import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartOpened = new EventEmitter<void>();
  private cartUpdated = new EventEmitter<void>(); // Novi EventEmitter za ažuriranje badge-a

  getCartOpenedEvent() {
    return this.cartOpened.asObservable();
  }

  getCartUpdatedEvent() {
    return this.cartUpdated.asObservable();
  }

  openCart() {
    this.cartOpened.emit();
  }

  updateCartBadge() {
    this.cartUpdated.emit();
  }
}
