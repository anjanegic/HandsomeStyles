import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  // , Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/)]
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const email = formValues.email;
      const password = formValues.password;
      console.log('Form Submitted!', formValues);
      this.service.login(email, password).subscribe((data) => {
        if (data == null) alert('Nema korisnika');
        else {
          localStorage.setItem('logged', data.email);
          this.router.navigate(['']);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
