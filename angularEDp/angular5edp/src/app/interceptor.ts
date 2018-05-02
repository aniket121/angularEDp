import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercepted request ... ");
         var token="token here"
         const headers = new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',

             
         });


       const cloneReq = req.clone({headers});
       return next.handle(cloneReq);

         

       

        }
}