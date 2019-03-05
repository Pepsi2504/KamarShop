import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2/index';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsService } from './shared/model/products.service';

import { AngularFireAuthModule } from 'angularfire2/auth';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { routerConfig } from './router.config';
import { AuthService } from './shared/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    OrderStatusComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routerConfig),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [ProductsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
