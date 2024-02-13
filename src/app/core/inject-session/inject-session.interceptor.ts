import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try{
      const token=this.cookieService.get('token')
        let newRequest=request
        newRequest=request.clone(
          {
            setHeaders:{
              authorization:`Bearer ${token}`,
              CUSTOM_HEADER:'HOLA'
            }
          }
        )
        return next.handle(newRequest);  
    }catch(error){
        console.log("Error",error)
    }
    console.log("hola👌👌",request)
    return next.handle(request);
  }
}
