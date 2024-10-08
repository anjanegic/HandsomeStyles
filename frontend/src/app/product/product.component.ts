import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Review } from '../models/review';
import { User } from '../models/user';
import { Order } from '../models/order';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatChipsModule, MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatIconModule, FormsModule, CommonModule, MatInputModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: Product;
  selectedVariant: any = null;
  labelText: string = 'Choose Variant';
  quantity: number = 1;
  reviews: Review[] = [];
  userReviews: { [key: string]: User } = {};
  orders: Order[] = [];
  hasOrderedProduct: boolean = false;
  userId: string = '';
  firstName: string = '';
  reviewComment: string = '';
  message: string = '';

  getUser() {
    return this.authService.getUser();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;
          this.selectedVariant = this.product.variants[0];
          this.setLabelText();

          this.fetchReviews();
          this.loadOrders();
        });
      }
      this.userId = this.authService.getUser()._id;
      this.firstName = this.authService.getUser().firstname;
    });
  }

  fetchReviews(): void {
    this.productService.getReviews(this.product._id).subscribe((reviews) => {
      this.reviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      try {
        const userIds = [...new Set(this.reviews.map((review) => review.userId))];
        for (const id of userIds) {
          this.userService.getUserById(id).subscribe((user) => {
            this.userReviews[id] = user;
          });
        }
        this.userId = this.authService.getUser()._id;
      } catch (error) {
        console.error('Greška prilikom dobijanja proizvoda:', error);
      }
    });
  }

  loadOrders() {
    this.userService.getOrders(this.authService.getUser()._id).subscribe((orders) => {
      this.orders = orders;
      this.checkIfOrderedProduct();
    });
  }

  checkIfOrderedProduct(): void {
    this.hasOrderedProduct = this.orders.some((order) => order.orderItems.some((item) => item.productId === this.product._id));
    console.log(this.hasOrderedProduct);
  }

  isReviewInputDisabled(): boolean {
    return !this.userId || !this.hasOrderedProduct;
  }

  getUserName(userId: string): string {
    return this.userReviews[userId]?.firstname || 'Nepoznat user';
  }

  onVariantChange(variant: any) {
    this.selectedVariant = variant;
  }

  setLabelText() {
    // if (this.product.variants.length > 0) {
    //   const firstVariant = this.product.variants[0];
    //   if (firstVariant.color) {
    //     this.labelText = 'color';
    //   } else if (firstVariant.model) {
    //     this.labelText = 'phone model';
    //   } else {
    //     this.labelText = 'choose variant';
    //   }
    // }
  }

  isInWishlist(): boolean {
    const user = this.getUser();
    return user && user.wishlist && user.wishlist.includes(this.product._id);
  }

  toggleWishlist() {
    if (this.authService.isLoggedIn()) {
    }
    if (this.getUser()) {
      if (this.isInWishlist()) {
        this.userService.removeFromWishlist(this.product._id, this.getUser()._id).subscribe();
        this.authService.patchUser({ ...this.getUser(), wishlist: this.getUser().wishlist.filter((id) => id !== this.product._id) });
      } else {
        this.userService.addToWishlist(this.product._id, this.getUser()._id).subscribe();
        this.authService.patchUser({ ...this.getUser(), wishlist: [...this.getUser().wishlist, this.product._id] });
      }
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
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
  addToCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const item = {
      product: this.product,
      variant: this.selectedVariant,
      quantity: this.quantity,
    };

    const variantKey = JSON.stringify(item.variant);

    const existingItemIndex = cartItems.findIndex((cartItem: any) => cartItem.product._id === item.product._id && JSON.stringify(cartItem.variant) === variantKey);

    if (existingItemIndex !== -1) {
      const newQuantity = cartItems[existingItemIndex].quantity + item.quantity;

      if (newQuantity > item.product.stock) {
        this.message = 'Not enough in stock! Currently available: ' + item.product.stock;
        return;
      }

      cartItems[existingItemIndex].quantity = newQuantity;
    } else {
      if (item.quantity > item.product.stock) {
        this.message = 'Not enough in stock! Currently available: ' + item.product.stock;
        return;
      }

      cartItems.push(item);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    this.cartService.openCart();
    this.cartService.updateCartBadge();
  }

  submitReview() {
    const review = {
      productId: this.product._id,
      userId: this.userId,
      firstname: this.firstName,
      comment: this.reviewComment,
      date: new Date(),
    };
    console.log(review);

    this.productService.submitReview(review).subscribe((data) => {
      console.log(data);

      this.reviews.push(data);
      this.reviews = this.reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.reviewComment = '';
    });
  }
}
