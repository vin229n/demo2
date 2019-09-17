import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';   
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './services/auth.guard';
import { HeaderComponent } from './header/header.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TableComponent,
    HeaderComponent,
    ChartComponent,
    SearchComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000, positionClass: 'toast-bottom-center', preventDuplicates: true}),
    BsDropdownModule.forRoot()
  ],
  providers: [AuthenticationService, ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
