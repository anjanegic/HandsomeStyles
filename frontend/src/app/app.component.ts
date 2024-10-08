import { Component, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule, NgIf } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http'; // TODO: remove
import { AuthService } from '../services/auth.service';
import { CartComponent } from './cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    HttpClientModule,
    CartComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(CartComponent) cartComponent!: CartComponent;

  isSearchActive = false;
  user: any;
  cartOpened: boolean = false;
  cartItems: any[] = [];
  isCheckoutOpened: boolean = false;
  collections: string[] = ['Phone Cases', 'Clothing', 'Accessories'];
  selectedCollection: string = '';

  constructor(public title: Title, private router: Router, private authService: AuthService, private cartService: CartService) {}

  getUser() {
    return this.authService.getUser();
  }

  isMenuHovered = false;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCheckoutOpened = event.url === '/checkout';
      }
    });

    const generateSessionId = () => 'SESSION-' + Math.random().toString(36).substring(2, 12).toUpperCase();

    const sessionId = localStorage.getItem('sessionId') || generateSessionId();
    localStorage.setItem('sessionId', sessionId);

    this.cartService.getCartUpdatedEvent().subscribe(() => {
      this.refreshCart();
    });

    this.onWindowScroll();
    this.user = this.authService.getUser();
    this.refreshCart();
  }

  navigateToCollection() {
    this.router.navigate(['/collection'], { queryParams: { title: this.selectedCollection } });
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.site-header') as HTMLElement;
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  loadCartFromLocalStorage() {
    const items = localStorage.getItem('cartItems');
    if (items) {
      this.cartItems = JSON.parse(items);
    }
  }

  refreshCart() {
    this.loadCartFromLocalStorage();
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  updateBadge() {
    this.refreshCart();
  }

  openCart() {
    this.cartComponent.openSidenav();
    this.cartOpened = true;
  }

  closeCart() {
    this.cartComponent.closeSidenav();
    this.cartOpened = false;
  }
}
