import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  data: any;
  location = 'Bengaluru';
  loading = false;
  error = false;
  constructor(private auth: AuthenticationService, private router: Router, private api: ApiService, private toastr: ToastrService) { }
  
  ngOnInit() {
    this.getWeather();
  }

  updateResponse(response: { data: any; location: string; }) {
    this.data = response.data;
    this.location = response.location;
  }

  getWeather()
  {
    this.loading = true;
    this.error = false;
    this.api.getWeather('bengaluru')
    .subscribe(
      (data:any) => {
        this.location = data.location;
        this.data = data.forecastdata.body;
        console.log(data.forecastdata.body.daily);
        this.loading = false
      },
      error => {
        console.log(error)
        this.loading = false
        this.error=true;
      }
    )
  }

  

}
