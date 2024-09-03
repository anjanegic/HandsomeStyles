import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductComponent } from './product/product.component';
import { CollectionComponent } from './collection/collection.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './search/search.component';
import { OrderConformationComponent } from './order-conformation/order-conformation.component';
import { NewsComponent } from './news/news.component';
import { OneNewsComponent } from './one-news/one-news.component';
import { QuestionComponent } from './question/question.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'HandsomeStyles' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'LogIn' },
  { path: 'user-info', component: UserInfoComponent, title: 'My Account' },
  { path: 'product', component: ProductComponent, title: 'Product' },
  { path: 'product:${id}', component: ProductComponent, title: 'Product' },
  { path: 'collection', component: CollectionComponent, title: 'Collection' },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
  { path: 'search', component: SearchComponent, title: 'Search' },
  { path: 'order-confirmation', component: OrderConformationComponent, title: 'Order confirmation' },
  { path: 'news', component: NewsComponent, title: 'News' },
  { path: 'one-news/:id', component: OneNewsComponent, title: 'News' },
  { path: 'questions', component: QuestionComponent, title: 'QOTD' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
