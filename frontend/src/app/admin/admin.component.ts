import { Component, ElementRef, OnInit, ViewChild, model } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Product } from '../models/product';
import { MatChip, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditDialogComponent } from './components/product-edit-dialog/product-edit-dialog.component';
import { UserOrdersReviewsDialogComponent } from './components/user-orders-reviews-dialog/user-orders-reviews-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatChip,
  ],

  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('variantInput') variantInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  user: any;
  selectedSection: string = 'users';
  users: User[] = [];
  allUsers: User[] = [];
  categories: Category[] = [];
  allProducts: Product[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  productForm: FormGroup;
  name = '';
  description = '';
  price = '';
  category = '';
  imageFilename = '';
  imageSrc: string | ArrayBuffer | null = null;
  variantsBefore: any[] = [];
  tagsBefore: string[] = [];
  stock = '';

  constructor(
    private snack: MatSnackBar,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.user = this.authService.getUser();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      imageFilename: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  updateProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '600px',
      data: {
        product: product,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.updateProduct(product._id, result).subscribe(() => {
          this.fetchAllProducts(); // Refresh the product list
        });
      }
    });
  }

  updateOrdersReviews(user: User) {
    const dialogRef = this.dialog.open(UserOrdersReviewsDialogComponent, {
      width: '1000px',
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
      //   this.productService.updateProduct(product._id, result).subscribe(() => {
      //     this.fetchAllProducts(); // Refresh the product list
      //   });
      // }
    });
  }

  ngOnInit(): void {
    this.route.fragment.pipe(take(1)).subscribe((fragment) => {
      this.selectedSection = fragment || 'users';
    });
    this.fetchUsers();
    this.fetchCategories();
    this.fetchAllProducts();
  }

  fetchUsers() {
    this.userService.getNotApprovedUsers().subscribe((users) => {
      this.users = users;
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });
  }

  fetchCategories() {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  fetchAllProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
    });
  }

  approveUser(user: User) {
    this.userService.approveUser(user._id).subscribe(() => {
      this.fetchUsers();
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user._id).subscribe(() => {
      this.fetchUsers();
    });
  }

  showSection(section: string): void {
    this.selectedSection = section;
    this.router.navigate(['/admin'], {
      fragment: section,
    });
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }

  addTags(tag: string) {
    if (tag) {
      this.tagsBefore.push(tag);
      this.tagInput.nativeElement.value = '';
    }
  }

  addVariant(variant: string) {
    if (variant) {
      this.variantsBefore.push(variant);
      this.variantInput.nativeElement.value = '';
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.productForm.patchValue({
        imageFilename: file.name,
      });

      const reader = new FileReader();

      reader.onload = () => {
        this.imageSrc = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.snack.open('Please fill all the required fields', '', {
        duration: 3000,
      });
      return;
    }

    const productData = {
      ...this.productForm.value,
      variants: this.variantsBefore,
      tags: this.tagsBefore,
    };

    this.productService.addProduct(productData).subscribe((data) => {
      const imageBlob = this.fileInput.nativeElement.files[0];
      const file = new FormData();
      file.set('file', imageBlob);

      this.http.post('http://localhost:4000/upload', file).subscribe({
        next: (response) => {
          this.snack.open('Great! Product added successfully :)', 'Close', {
            duration: 2000,
          });
          this.productForm.reset();
          this.variantsBefore = [];
          this.tagsBefore = [];
          this.imageSrc = null;
        },
        error: () => {
          this.snack.open('Opps, failed to save product', 'Close', {
            duration: 3000,
          });
        },
      });
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product._id).subscribe(() => {
      this.fetchAllProducts();
    });
  }

  add(event: MatChipInputEvent, product: Product): void {
    const value = (event.value || '').trim();

    if (value) {
      product.variants.unshift(value);
      this.productService.addVariant(product).subscribe(() => {});
    }

    event.chipInput.clear();
  }

  remove(variant: string, product: Product) {
    product.variants.splice(product.variants.indexOf(variant), 1);
    this.productService.addVariant(product).subscribe(() => {});
  }

  currentTag: string = '';

  addTag(event: any, product: Product): void {
    const value = (event.target as HTMLInputElement).value.trim();

    if (value && !product.tags.includes(value)) {
      product.tags.push(value);

      this.productService.updateTags(product).subscribe(() => {
        // Možete ažurirati view ili dodati dodatnu logiku ovde
      });

      (event.target as HTMLInputElement).value = '';
    }
  }

  removeTag(product: Product, tag: string) {
    product.tags.splice(product.tags.indexOf(tag), 1);
    this.productService.updateTags(product).subscribe(() => {});
  }
}
