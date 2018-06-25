import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
interface UserResponse {
  message: string;
  result: any;
  status: any;
  token: any;
  data: any;
}
@Injectable()
export class UserService {
   isLoggedIn: boolean = false;
   constructor(private http: HttpClient) {}
   redirectUrl : string;
   // tslint:disable-next-line:member-ordering
   public dataName = ''
   
    getUsers() {
        return this.http.get<any>(environment.API_URL + 'user/getAll').map(res => res);
    }

    getUserGroups() {
        return this.http.get<any>(environment.API_URL + 'user/group/getAll').map(res => res);
    }

    getUserRoles() {
        return this.http.get<any>(environment.API_URL + 'user/roles/getAll').map(res => res);
    }
}
