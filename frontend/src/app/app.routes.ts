import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'HandsomeStyles' },
  // { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'LogIn' },
  { path: 'user-info', component: UserInfoComponent, title: 'UserInfo' },
  { path: 'user', component: UserComponent, title: 'UserInfo' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
