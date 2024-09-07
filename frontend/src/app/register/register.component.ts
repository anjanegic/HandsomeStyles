import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  passwordRepeatFormControl = new FormControl('', [Validators.required]);
  registerForm: FormGroup;
  errorMessage = '';
  message = '';

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private authService: AuthService) {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)[A-Za-z\d]{8,}$/)]],
        passwordRepeat: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordRepeat = form.get('passwordRepeat')?.value;
    return password === passwordRepeat ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const email = formValues.email;
      const firstname = formValues.firstname;
      const lastname = formValues.lastname;
      const password = formValues.password;

      this.service.register(email, firstname, lastname, password).subscribe((data) => {
        if (data == null) alert('Error');
        else {
          this.message = 'Registration successful!';
        }
      });
      //   this.service.login(email, password).subscribe((data) => {
      //     if (data == null) alert('Nema korisnika');
      //     else {
      //       this.authService.login(data);
      //       this.router.navigate(['']);
      //     }
      //   });
      // } else {
      //   console.log('Form is not valid');
      // }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
