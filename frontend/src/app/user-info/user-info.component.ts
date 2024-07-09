import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ChangeDataDialogComponent } from '../change-data-dialog/change-data-dialog.component';

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
    this.dialog.open(ChangeDataDialogComponent, {
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
