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
    createUser(data) {
        return this.http.post<any>(environment.API_URL + 'user/create', data).map(res => res);
    }
    updateUser(data) {
        return this.http.post<any>(environment.API_URL + 'user/update', data).map(res => res);
    }
    deleteUser(data) {

     return this.http.post<any>(environment.API_URL + 'user/delete', data).map(res => res);
    }
    getUserGroups() {
        return this.http.get<any>(environment.API_URL + 'user/group/getAll').map(res => res);
    }
    createGroup(data) {
        return this.http.post<any>(environment.API_URL + 'user/group/create', data).map(res => res);
    }
    updateGroup(data) {
        return this.http.post<any>(environment.API_URL + 'user/group/update', data).map(res => res);
    }
    deleteGroup(data) {
        return this.http.post<any>(environment.API_URL + 'user/group/delete', data).map(res => res);
    }
    getMembers(data) {
        return this.http.get<any>(environment.API_URL + 'user/getAll?groupId=' + data).map(res => res);
    }
    createMember(data,groupId) {
        return this.http.post<any>(environment.API_URL + 'user/'+data.id+'/addto/group/'+ groupId,data).map(res => res);
    }
    deleteMember(data,groupId) {
        return this.http.post<any>(environment.API_URL + 'user/'+data.id+'/removefrom/group/'+ groupId,data).map(res => res);
    }

    getUserRoles() {
        return this.http.get<any>(environment.API_URL + 'user/roles/getAll').map(res => res);
    }
    createRole(data) {
        return this.http.post<any>(environment.API_URL + 'user/role/create', data).map(res => res);
     }
     updateRole(data) {
        return this.http.post<any>(environment.API_URL + 'user/role/update', data).map(res => res);
     }
     deleteRole(data) {
        return this.http.post<any>(environment.API_URL + 'user/role/delete', data).map(res => res);
     }

    //  Directory service starts here 

    getDirectory() {
        return this.http.get<any>(environment.API_URL + 'directory/getAll').map(res => res);

    }
    getUserDirectory(data) {
        return this.http.get<any>(environment.API_URL + 'directory/getUsers?name=' + data.name).map(res => res);
    }
    getGroupDiretory(data) {
        return this.http.get<any>(environment.API_URL + 'directory/getGroups?name=' + data.name).map(res => res);
    }
    getRuleDirectory(data) {
        return this.http.get<any>(environment.API_URL + 'directory/rules/getAll?name=' + data.name).map(res => res);
    }
    createDirectory(data) {
        return this.http.post<any>(environment.API_URL + 'directory/create', data).map(res => res);
    }
    updateDirectory(data) {
        return this.http.post<any>(environment.API_URL + 'directory/update', data).map(res => res);
    }
    deleteDirectory(data) {
    return this.http.post<any>(environment.API_URL + 'directory/delete', data).map(res => res);
  }
  syncDirectory(data) {
    return this.http.post<any>(environment.API_URL + 'directory/sync?name='+ data.name, data).map(res => res);
  }
}
