import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  @Output() gotSearchResults: EventEmitter<any> = new EventEmitter<any>();
  searchText: string;
  loading = false;
  user: User;
  constructor(private auth: AuthenticationService, private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    //alert(this.user.name);
  }

  logout() {
    this.auth.logOut()
    .subscribe( (res:any) =>{
      this.toastr.success("Logged Out!");
    },
    error => {
      //this.toastr.error("Something went wrong!");
    });
    this.router.navigate(['login']);
  }





}
