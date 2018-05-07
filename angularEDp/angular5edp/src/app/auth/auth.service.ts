import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams } from "@angular/common/http";
import { environment } from './../../environments/environment';
interface UserResponse {
  message: string;
  result: any;
  
}
@Injectable()
export class AuthService {
   isLoggedIn: boolean = false;
   constructor(private http: HttpClient) {}
   redirectUrl: string;


  registerUser(data) {
 
  return this.http.post(environment.API_URL + '/register', data).map(res => res);
  }

  login(data) {
  
  return this.http.post<UserResponse>(environment.API_URL + '/login', data).map(res => res);
  }

  forgotPassword(data) {
  return this.http.post(environment.API_URL + '/forgot/', data).map(res => res);
  }
  resetPassword(data) {
  return this.http.post(environment.API_URL + '/rest-password/', data).map(res => res);
  }

}
