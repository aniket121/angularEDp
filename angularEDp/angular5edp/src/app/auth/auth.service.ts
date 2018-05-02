import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams } from "@angular/common/http";
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
   isLoggedIn: boolean = false;
   constructor(private http: HttpClient) {}
   redirectUrl: string;


  registerUser(data) {
  const body = new HttpParams()
    .set('businessUnit', data.businessUnit)
    .set('email', data.email)
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('password', data.password)
    .set('phone', data.phone)
    .set('clientName', data.clientName);
  return this.http.post(environment.API_URL + '/register', body).map(res => res);
  }

  login(data) {
  const body = new HttpParams()
    .set('email', data.email)
    .set('password', data.password);
  return this.http.post(environment.API_URL + '/loginnew', body).map(res => res);
  }

  forgotPassword(data) {
  return this.http.post(environment.API_URL + '/forgot/', data).map(res => res);
  }

}
