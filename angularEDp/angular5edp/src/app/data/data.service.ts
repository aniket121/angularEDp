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
export class DataService {
   isLoggedIn: boolean = false;
   constructor(private http: HttpClient) {}
   redirectUrl : string;
   // tslint:disable-next-line:member-ordering
   public dataName = ''
   addLocation(data) {
      return this.http.post<UserResponse>(environment.API_URL + '/datalocation/add', data).map(res => res);
   }
   getLocation() {
      return this.http.get<UserResponse>(environment.API_URL + '/datalocation/list').map(res => res);
   }
   sync(dataName: any) {
      return this.http.post<UserResponse>(environment.API_URL + 'datalocation/sync?name=' + dataName, dataName).map(res => res);
   }
   test(dataName: any) {
      return this.http.post<UserResponse>(environment.API_URL + 'datalocation/test?name=' + dataName, dataName).map(res => res);
   }
   deleteLocation(data: any) {
      return this.http.post<UserResponse>(environment.API_URL + 'datalocation/delete', data).map(res => res);
   }
   updateLocation(data: any) {
      return this.http.post<UserResponse>(environment.API_URL + '/datalocation/update', data).map(res => res);
   }
   getStore(data: any) {
    return this.http.get<UserResponse>(environment.API_URL + '/dataStore/loadByLocation?id=' + data.id).map(res => res);
 }
 getProperties(data: any) {
  return this.http.get<UserResponse>(environment.API_URL + '/dataStore/properties/getAll?dataStoreId=' + data.id).map(res => res);
}
getFields(data: any) {

  return this.http.get<UserResponse>(environment.API_URL + '/dataStore/field/getAll?dataStoreId= ' + data.id).map(res => res);
}

addStore(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/store/create', data).map(res => res);
}
getDataFormat() {
  return this.http.get<any>(environment.API_URL + '/dataformat/getAll').map(res => res);
}
deleteStore(data: any) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/delete?id=' + data.id, data).map(res => res);

}
updateStore(data) {

  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/store/updatelite', data).map(res => res);
}
cloneStore(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/clone', data).map(res => res);
}

addFields(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/field/create', data).map(res => res);
}
updateField(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/field/update', data).map(res => res);

}
deletefield(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/field/delete?id=' + data.id, data).map(res => res);
}

cloneField(data) {
  return this.http.post<UserResponse>(environment.API_URL + '/dataStore/field/clone', data).map(res => res);
}
getDbData(profile){
  return this.http.get<any>(environment.API_URL + '/centralDataSource/getDbData', {params: profile}).map(res => res);
}
getS3Data(profile){
  return this.http.get<any>(environment.API_URL + '/centralDataSource/gets3data', {params: profile}).map(res => res);
}
// getS3DataNew(profile){
//   return this.http.get(environment.API_URL + '/centralDataSource/gets3datanew',{params: profile, responseType:'arraybuffer'}).map(res => {return {'data': res}});
// }

getRemoteStores(data: any) {
  return this.http.get<any>(environment.API_URL + '/centralDataSource/getRemoteStores?location=' + data.name).map(res => res);
}
}
