import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {
   constructor(private http: HttpClient) {}
   redirectUrl: string;


  getService() {
 
  return this.http.get(environment.API_URL + '/get?username=user@yopmail.com').map(res => res);
  }

}
