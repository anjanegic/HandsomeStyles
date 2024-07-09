import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http'; // TODO: remove
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgIf, MatButtonModule, MatMenuModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSidenavModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  isSearchActive = false;
  user: any;

  constructor(public title: Title, private router: Router, private authService: AuthService) {}

  getUser() {
    return this.authService.getUser();
  }

  isMenuHovered = false;

  ngOnInit() {
    this.onWindowScroll(); // Initialize on load to apply background if needed
    this.user = this.authService.getUser();
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.site-header') as HTMLElement;
    if (window.scrollY > 50) {
      // Change 50 to whatever scroll distance you want
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
}
