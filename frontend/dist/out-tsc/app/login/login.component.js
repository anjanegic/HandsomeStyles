import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, service) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
        this.passwordFormControl = new FormControl('', [Validators.required]);
        this.errorMessage = '';
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }
    // , Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/)]
    onSubmit() {
        if (this.loginForm.valid) {
            const formValues = this.loginForm.value;
            const username = formValues.email;
            const password = formValues.password;
            console.log('Form Submitted!', formValues);
            this.service.login(username, password).subscribe((data) => {
                if (data == null)
                    alert('Nema korisnika');
                else
                    alert('Hello ' + data.firstname);
            });
        }
        else {
            console.log('Form is not valid');
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        standalone: true,
        imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule],
        templateUrl: './login.component.html',
        styleUrl: './login.component.css',
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map