import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './reset-password-dialog.component.html',
  styleUrl: './reset-password-dialog.component.css',
})
export class ResetPasswordDialogComponent implements OnInit {
  message = '';
  successMessage = '';
  passwordForm = this.formBuilder.group(
    {
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)[A-Za-z\d]{8,}$/)]],
      passwordRepeat: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator, updateOn: 'blur' }
  );

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordRepeat = form.get('passwordRepeat')?.value;
    return password === passwordRepeat ? null : { passwordMismatch: true };
  }

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const formValues = this.passwordForm.value;
      const password = formValues.password;
      const passwordRepeat = formValues.passwordRepeat;

      this.service.resetPassword(this.authService.getUser()._id, password, passwordRepeat).subscribe((data) => {
        if (data == null) alert('Error');
        else {
          this.successMessage = 'Password changed successfully!';
        }
      });
    } else {
      this.message = 'Passwords do not match';
    }
  }

  onCancel(): void {}
}
