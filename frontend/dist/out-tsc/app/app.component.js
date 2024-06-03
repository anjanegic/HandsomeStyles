import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
let AppComponent = class AppComponent {
    constructor(title, router) {
        this.title = title;
        this.router = router;
        this.isSearchActive = false;
        this.isMenuHovered = false;
    }
    openMenu() {
        this.menuTrigger.openMenu();
    }
    closeMenu() {
        setTimeout(() => {
            if (!this.isMenuHovered) {
                this.menuTrigger.closeMenu();
            }
        }, 1000);
    }
    menuOpened() {
        this.isMenuHovered = true;
    }
    menuClosed() {
        this.isMenuHovered = false;
    }
    toggleSearch() {
        this.isSearchActive = !this.isSearchActive;
    }
    ngOnInit() {
        this.onWindowScroll(); // Initialize on load to apply background if needed
    }
    onWindowScroll() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            // Change 50 to whatever scroll distance you want
            header.classList.add('scrolled');
        }
        else {
            header.classList.remove('scrolled');
        }
    }
};
__decorate([
    ViewChild(MatMenuTrigger)
], AppComponent.prototype, "menuTrigger", void 0);
__decorate([
    HostListener('window:scroll', [])
], AppComponent.prototype, "onWindowScroll", null);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [RouterOutlet, NgIf, MatButtonModule, MatMenuModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSidenavModule, HttpClientModule],
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map