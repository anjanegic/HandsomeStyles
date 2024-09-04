import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const email = formValues.email;
      const password = formValues.password;
      console.log('Form Submitted!', formValues);
      this.service.login(email, password).subscribe((data) => {
        if (data == null) this.errorMessage = 'Invalid Credentials';
        if (data.message === 'Not approved') this.errorMessage = 'Still not approved!';
        else {
          this.authService.login(data);
          // @ts-ignore
          if (this.route.snapshot.queryParams?.returnUrl) {
            // @ts-ignore
            const decodedUrl = decodeURIComponent(this.route.snapshot.queryParams?.returnUrl);
            const [path, queryString] = decodedUrl.split('?');
            const queryParams = queryString.split('&').reduce((params, param) => {
              const [key, value] = param.split('=');
              params[key] = value;
              return params;
            }, {} as any);

            this.router.navigate([path], { queryParams });
          } else {
            this.router.navigate(['/']);
          }
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
