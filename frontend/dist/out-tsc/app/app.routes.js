import { __decorate } from "tslib";
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
export const routes = [
    { path: '', component: HomepageComponent, title: 'HandsomeStyles' },
    // { path: '', redirectTo: '/homepage', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'login', component: LoginComponent, title: 'LogIn' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app.routes.js.map