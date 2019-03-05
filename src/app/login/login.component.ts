import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators,} from "@angular/forms"
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  public Registerform : FormGroup;

  public user$ = this.authService.user;

  showRegisterSuccessMessage: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });

    this.Registerform = this.formBuilder.group({
      Remail:['', Validators.required],
      Rpassword:['',Validators.required]
    });
   }

  ngOnInit() {
  }

  loginwithGoogle(){
    this.authService.loginwithGoogle();
  }

  login(){
    const inputValue = this.form.value;
    console.log(inputValue.email, inputValue.password);

    this.authService.login(inputValue.email, inputValue.password)
    .subscribe(
      success => this.router.navigate(['/']),
      error => alert(error)
      
    );
  }
  
  register(){
    const inputValue = this.Registerform.value;
    console.log(inputValue.Remail, inputValue.Rpassword);

    this.authService.register(inputValue.Remail, inputValue.Rpassword)
    .subscribe(
      success => this.showRegisterSuccessMessage = true,
      error => alert(error)    
    );
  }

}
