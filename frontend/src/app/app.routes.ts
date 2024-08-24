import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductComponent } from './product/product.component';
import { CollectionComponent } from './collection/collection.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'HandsomeStyles' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'LogIn' },
  { path: 'user-info', component: UserInfoComponent, title: 'UserInfo' },
  { path: 'product', component: ProductComponent, title: 'Product' },
  { path: 'product:${id}', component: ProductComponent, title: 'Product' },
  { path: 'collection', component: CollectionComponent, title: 'Collection' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
