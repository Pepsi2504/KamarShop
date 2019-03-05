import {Route} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';


export const routerConfig : Route[] = [
    {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' }
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
      },
      {
        path: 'product',
        children: [
          {
            path: ':id',
            component: ProductDetailComponent
          },
          {
            path: '',
            component: ProductComponent
          }
        ]       
      },
    
      {
        path: 'cart',
        component: CartComponent,
        data: { title: 'Cart' }
      },
      {
        path: 'cart/order-status',
        component: OrderStatusComponent,
        data: { title: 'Cart Status' }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { title: 'Admin Page' }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { title: 'Contact' }
      },
      { path: '**',
        redirectTo: '',
      }
]; 