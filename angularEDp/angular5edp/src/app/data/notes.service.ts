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
export class DataNotesService {
   isLoggedIn: boolean = false;
   constructor(private http: HttpClient) {}
   redirectUrl : string;
   // tslint:disable-next-line:member-ordering
   public dataName = ''
   
   addDataSourceNote(data) {
      return this.http.post<UserResponse>(environment.API_URL + '/notes/dataRow/add', data).map(res => res);
   }
   getAllDataSourceNotes(data) {
      return this.http.get<any>(environment.API_URL + '/notes/dataRow/getByDataStouceName', {params: data}).map(res => res);
   }
   
   deleteDataSourceNote(data: any) {
      return this.http.post<UserResponse>(environment.API_URL + '/notes/dataRow/delete?id=' + data.id, data).map(res => res);
   }
   updateDataSourceNote(data: any) {
      return this.http.post<UserResponse>(environment.API_URL + '/notes/dataRow/update', data).map(res => res);
   }
   addDataStoreNote(data) {
    return this.http.post<UserResponse>(environment.API_URL + '/notes/dataStore/add', data).map(res => res);
    }
    getAllDataStoreNotes(data) {

        return this.http.get<any>(environment.API_URL + '/notes/dataStore/getByDataStouceName', {params: data}).map(res => res);
    }

    deleteDataStoreNote(data: any) {
        return this.http.post<UserResponse>(environment.API_URL + '/notes/dataStore/delete', data).map(res => res);
    }
    updateDataStoreNote(data: any) {
        return this.http.post<UserResponse>(environment.API_URL + '/notes/dataStore/update', data).map(res => res);
    }

}
