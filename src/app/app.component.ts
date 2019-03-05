import { Component } from '@angular/core';

import {initializeApp, database} from 'firebase'

import {firebaseConfig} from "../environments/firebase.config";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gshop';

  public isLoggedIn;

  constructor(public authService : AuthService, private router : Router){
    authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedIn = success,
    );
   }

   logout(){
     this.authService.logout();
     this.router.navigate(['/'])
   }

}  