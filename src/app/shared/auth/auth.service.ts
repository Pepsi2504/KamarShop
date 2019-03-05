import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from "firebase/app";
import { from } from 'rxjs';
import { Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user : Observable<firebase.User>;

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState){
        return null;
      }else{
        return authState.uid;
      }
    })
  );

  isAdmin : Observable<boolean> = this.uid.pipe(
    switchMap(uid => {
      if(!uid){
        return observableOf(false);
        console.log('ấd')
      }else{
        return this.db.object<boolean>('/admin/' + uid).valueChanges();
      }
    })
  );


  constructor(private db : AngularFireDatabase, private afAuth : AngularFireAuth, private router : Router) {
    this.user = afAuth.authState;
   }

   loginwithGoogle(){
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //  this.router.navigate(['/'])
   }

   login(email, password): Observable<any>{
     return from(
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
     );    
   }

   register(Remail, Rpassword): Observable<any>{
     return from(
       this.afAuth.auth.createUserWithEmailAndPassword(Remail,Rpassword)
     );
   }

   isAuthenticated() : Observable<boolean>{
     return this.user.map(user => user && user.uid !== undefined);
   }

   logout(){
     localStorage.clear();
     this.afAuth.auth.signOut();
   }

}
