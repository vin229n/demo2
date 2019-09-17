import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getWeather(address){
    const url = 'api/weather?address='+address;
    const authorizationData = 'Bearer '+localStorage.getItem('token');
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':  authorizationData
      })
    }
    return this.http.get(url,headerOptions);
  }

}
