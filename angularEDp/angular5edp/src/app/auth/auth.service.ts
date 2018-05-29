import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { environment } from './../../environments/environment';
interface UserResponse {
  message: string;
  result: any;
  status:any;
  token:any;
  data:any;
  error:any;
  username:any;
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
  let body = new HttpParams()
  body=body.append('email', data.email);
  body=body.append('password', data.password);
  console.log("body",body)
  return this.http.post<UserResponse>(environment.API_URL + '/loginnew', body).map(res => res);
  }

  forgotPassword(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/forgot', data).map(res => res);
  }
  resetPassword(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/reset', data).map(res => res);
  }

}
