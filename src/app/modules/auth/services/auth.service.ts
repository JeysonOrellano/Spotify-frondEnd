import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {tap} from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api

  constructor(private http: HttpClient,private cooke:CookieService) { }


  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/auth/login`, body)
    .pipe(
      tap((res:any)=>{
        const{tokenSession,data}=res ;
        console.log('toke',tokenSession)
        this.cooke.set('token_service',tokenSession,4,'/') //Guardando la cooki
      })
    )
    console.log("Email", email, "pas", password);
  }
}
