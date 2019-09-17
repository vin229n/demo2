import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() gotSearchResults: EventEmitter<any> = new EventEmitter<any>();
  searchText: string;
  loading = false;
  user: User;
  constructor( private api: ApiService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.searchText !== undefined) {
      this.loading = true;
      this.getWeather();
    } else {
      this.toastr.error('Please provide address');
    }
  }

  getWeather()
  {
    if(this.searchText !== undefined || this.searchText !== ''){
      this.loading = true;
      
      this.api.getWeather(this.searchText)
      .subscribe(
        (data:any) => {
          this.loading = false
          this.gotSearchResults.emit({data:data.forecastdata.body,location:data.location})
        },
        error => {
          this.toastr.error('unable to find location'); 
          this.loading = false;
        }
      )
    }
    else {
      this.toastr.error('Please provide the address'); 
    }
    this.searchText = undefined;
  }

}
