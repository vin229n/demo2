import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private auth:AuthenticationService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(5),
        ],
      ),
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

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }



  register()
  {
    if(this.form.valid){
      this.auth.register(this.form.value.name, this.form.value.email,this.form.value.password)
      .subscribe(
          (userr: any) => {console.log('added user successfully', userr);

             this.toastr.success("Rigistration successfull!");
             this.auth.logIn(userr.user,userr.token)
             this.router.navigate(['']);
          },
          (error) => {console.log('Error in register:', error);
          });
      
      }
  }
  
  

}
