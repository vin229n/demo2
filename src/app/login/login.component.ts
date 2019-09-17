import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidCredentials = false;
  loading = false;
  connection = true;

  constructor(private auth: AuthenticationService, private router: Router) {
   }

   ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      )
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }


  logIn() {
    if (this.form.valid) {
      this.invalidCredentials = false;
      this.connection = true;
      this.loading = true;
      this.auth.authenticate(this.form.value)
      .subscribe(
        (user: any) => {
          
          this.auth.logIn(user.user,user.token);
          this.router.navigate(['']);
          this.loading = false;
        },
        (error) => {
          
          this.loading = false;
          if(error.status === 400){
            this.invalidCredentials = true;
            setTimeout(() => {
              this.invalidCredentials = false;
            }, 3000);
          }
          else{
            this.connection = false;
          }
          
        }
      );
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
