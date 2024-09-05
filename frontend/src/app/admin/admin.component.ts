import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  user: any;
  selectedSection: string = 'users';
  users: User[] = [];
  allUsers: User[] = [];
  categories: Category[] = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

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
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private formBuilder: FormBuilder
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

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchCategories();
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
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }

  onSubmit() {
    const productData = {
      ...this.productForm.value,
      variants: this.variantsBefore,
      tags: this.tagsBefore,
    };
    console.log(productData);
  }

  addTags(tag: string) {
    if (tag) {
      this.tagsBefore.push(tag);
      this.productForm.get('tags')?.reset(); // Resetujte kontrolu za unos varijante
    }
  }

  addVariant(variant: string) {
    if (variant) {
      this.variantsBefore.push(variant);
      this.productForm.get('variants')?.reset(); // Resetujte kontrolu za unos varijante
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
    const productData = {
      ...this.productForm.value,
      variants: this.variantsBefore,
      tags: this.tagsBefore,
    };
    console.log(productData);
    this.productService.addProduct(productData).subscribe((data) => {
      const imageBlob = this.fileInput.nativeElement.files[0];
      const file = new FormData();
      file.set('file', imageBlob);

      this.http.post('http://localhost:4000/upload', file).subscribe((response) => {});

      console.log(data);
    });
  }
}
