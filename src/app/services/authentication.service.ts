import { Injectable, OnInit } from '@angular/core';
import {User} from '../models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User;
  private token:string;
  constructor( private http: HttpClient) { }

  isAuth() {
    if (localStorage.length > 0) {
      this.currentUser = JSON.parse(localStorage.getItem('userInfo'));
      this.token = localStorage.getItem('token')
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    //alert("in auth"+this.currentUser.name)
    return this.currentUser;
  }

  logIn(user: User,token:string) {
    this.currentUser = user;
    localStorage.setItem('userInfo', JSON.stringify(this.currentUser));
    localStorage.setItem('token',token)
    console.log(user)
  }

  register(username: string,email:string, password: string) {
    const user: User = new User() ;
    user.name = username;
    user.password = password;
    user.email = email;
    return this.insertUser(user);
  }

  logOut() {
    const authorizationData = 'Bearer '+localStorage.getItem('token');
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':  authorizationData
      })
    }
    localStorage.clear();
    this.currentUser = null;
    this.token = null;

    return this.http.get('/api/users/logout',headerOptions)
  }


  insertUser(user: User) {
    return this.http.post('/api/users', user);
  }

  authenticate(user) {
    
    return this.http.post('/api/users/login',user);
  }

}
