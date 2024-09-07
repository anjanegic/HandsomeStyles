import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'change-data-dialog-component',
  templateUrl: './change-data-dialog.component.html',
  standalone: true,
  styleUrl: './change-data-dialog.component.css',
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
export class ChangeDataDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ChangeDataDialogComponent>);
  user: any;

  changeDataForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private authService: AuthService, private location: Location) {
    this.user = this.authService.getUser();
    this.changeDataForm = this.formBuilder.group({
      firstname: [this.user.firstname, []],
      email: [this.user.email, [Validators.email]],
      lastname: [this.user.lastname, []],
      address: [this.user.address, []],
      city: [this.user.city, []],
      country: [this.user.country, []],
      postalCode: [this.user.postalCode, []],
      phone: [this.user.phone, []],
    });
  }

  onSubmit(): void {
    if (this.changeDataForm.valid) {
      const _id = this.user._id;
      const formValues = this.changeDataForm.value;
      const email = formValues.email;
      const firstname = formValues.firstname;
      const lastname = formValues.lastname;
      const address = formValues.address;
      const city = formValues.city;
      const country = formValues.country;
      const postalCode = formValues.postalCode;
      const phone = formValues.phone;
      console.log('Form Submitted!', formValues);
      this.service.changeData(_id, email, firstname, lastname, address, city, country, postalCode, phone).subscribe((data) => {
        if (data == null) alert('Nema korisnika');
        else {
          this.authService.login(data);
          this.router.navigate(['user-info']).then(() => {
            window.location.reload();
          });
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
