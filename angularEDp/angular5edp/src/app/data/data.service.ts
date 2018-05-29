import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams } from "@angular/common/http";
import { environment } from './../../environments/environment';
interface UserResponse {
  message: string;
  result: any;
  status:any;
  token:any;
  data:any;
}
@Injectable()
export class DataService {
   isLoggedIn: boolean = false;
   constructor(private http: HttpClient) {}
   redirectUrl: string;
   addLocation(data) {
      return this.http.post<UserResponse>(environment.API_URL + '/datalocation/add', data).map(res => res);
   }
   getLocation() {
      return this.http.get<UserResponse>(environment.API_URL + '/datalocation/list').map(res => res);
   }

  

}
