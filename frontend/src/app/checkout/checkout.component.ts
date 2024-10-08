import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionService } from '../../services/question.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatRadioModule, MatDividerModule, MatIconModule, MatBadgeModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  shippingForm: FormGroup;
  paymentForm: FormGroup;
  beforeDiscountAmount = 0;
  discountErrorMessage: string = '';
  // discountAmount is the amount that will be subtracted from the total price
  // null means that no discount code has been applied
  // 0 means that the discount code is invalid
  discountAmount: number = 0;
  subtotal = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private questionService: QuestionService
  ) {
    this.shippingForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, this.phoneValidator]],
      discountCode: [''],
    });
    this.paymentForm = this.formBuilder.group({
      paymentMethod: [''],
    });
  }

  ngOnInit(): void {
    this.cartItems = this.getCartItems();
  }

  applyDiscountCode(): void {
    const discountCode = this.shippingForm.get('discountCode')?.value;
    if (discountCode != '') {
      this.questionService.checkDiscountCode(discountCode).subscribe(
        (response) => {
          if (response.valid) {
            const subtotalPrice = this.subtotal;
            const shippingPrice = 5;
            this.beforeDiscountAmount = subtotalPrice + shippingPrice;
            this.discountAmount = this.beforeDiscountAmount * response.amount;
          } else {
            this.discountAmount = 0;
            this.discountErrorMessage = 'Invalid discount code';
          }
        },
        (error) => {
          this.discountErrorMessage = 'Invalid discount code';
        }
      );
    }
  }

  onSubmit(): void {
    const selectedPaymentMethod = this.paymentForm.get('paymentMethod')?.value;
    if (this.shippingForm.valid && selectedPaymentMethod === 'cod') {
      const cartItemsString = localStorage.getItem('cartItems');
      let cartItems: any[] = [];
      if (cartItemsString) {
        cartItems = JSON.parse(cartItemsString);
      }

      const orderItems = this.transformToOrderItems(cartItems);
      const shipping = this.shippingForm.value;
      const paymentMethod = this.paymentForm.get('paymentMethod')?.value;
      const subtotalPrice = this.subtotal;
      const shippingPrice = 5;
      this.beforeDiscountAmount = subtotalPrice + shippingPrice;

      const totalPrice = this.getTotalPrice() + 5;

      let userId: string | undefined;
      if (this.authService.getUser()) {
        userId = this.authService.getUser()._id;
      } else {
        userId = undefined;
      }

      const dateAndTime = new Date();

      const orderJson = {
        orderItems,
        shipping,
        paymentMethod,
        subtotalPrice,
        shippingPrice,
        totalPrice,
        userId,
        dateAndTime,
        status: 'pending',
      };

      this.service.addOrder(orderJson).subscribe((order) => {
        cartItems.forEach((item) => {
          console.log('Item', item.product._id);

          this.productService.reduceStock(item.product._id, item.quantity).subscribe(
            (response) => {
              console.log('Stock reduced for', item.product.name);
            },
            (error) => {
              console.error('Error reducing stock for', item.product.name, error);
            }
          );
        });

        if (this.shippingForm.get('discountCode')?.value) {
          this.questionService.usedDiscountCode(this.shippingForm.get('discountCode')?.value).subscribe(
            (response) => {
              if (response.success) {
                localStorage.removeItem('cartItems');
                this.router.navigate(['/order-confirmation']);
              } else {
              }
            },
            (error) => {
              console.error('Error using discount code:', error);
            }
          );
        }

        localStorage.removeItem('cartItems');
        this.router.navigate(['/order-confirmation']);
      });
    } else {
      console.log('Form Invalid!');
    }
  }

  transformToOrderItems(cartItems: any[]): any[] {
    return cartItems.map((item) => {
      return {
        productId: item.product._id,
        name: item.product.name,
        variant: item.variant,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.imageFilename,
      };
    });
  }

  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  getTotalPrice(): number {
    const total = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.subtotal = total;
    if (this.discountAmount) {
      return total - this.discountAmount;
    }
    return total;
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (phoneNumber && !phoneNumber.startsWith('+')) {
      return { phoneInvalid: true };
    }
    return null;
  }
}
