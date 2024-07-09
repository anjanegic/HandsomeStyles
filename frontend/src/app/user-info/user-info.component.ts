import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'change-data-dialog',
  templateUrl: './changeData.html',
  standalone: true,
  styles: [
    `
      .changeData-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;

        & > mat-form-field {
          min-width: 400px;
        }
      }

      mat-dialog-actions {
        align-self: flex-end;
      }

      h1 {
        color: #dd735e !important;
        font-weight: bolder !important;
        align-self: center;
      }

      #submit-button {
        color: #dd735e !important;
        font-weight: bold !important;
        border-color: #f6dad5 !important;
      }

      #close-button {
        color: #757575 !important;
      }
    `,
  ],
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
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  user: any;

  changeDataForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private authService: AuthService) {
    this.user = this.authService.getUser();
    this.changeDataForm = this.formBuilder.group({
      firstname: [this.user.firstname, []],
      email: [this.user.email, [Validators.email]],
      lastname: [this.user.lastname, []],
      address: [this.user.address, []],
      country: [this.user.country, []],
      phone: [this.user.phone, []],
    });
  }

  onSubmit(): void {
    if (this.changeDataForm.valid) {
      const formValues = this.changeDataForm.value;
      const email = formValues.email;
      const firstname = formValues.firstname;
      const lastname = formValues.lastname;
      const address = formValues.address;
      const country = formValues.country;
      const phone = formValues.phone;
      console.log('Form Submitted!', formValues);
      // this.service.changeData(email, firstname, lastname, address, country, phone).subscribe((data) => {
      //   if (data == null) alert('Nema korisnika');
      //   else {
      //     this.authService.login(data);
      //     this.router.navigate(['']);
      //   }
      // });
    } else {
      console.log('Form is not valid');
    }
  }
}

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgIf, MatDialogModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  user: any;
  selectedSection: string = 'account';
  maskedpassword: string;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
    this.maskedpassword = '*'.repeat(this.user.password.length);
  }

  showSection(section: string): void {
    this.selectedSection = section;
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '45vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  changeData(): void {}

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
