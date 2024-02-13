import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  errorSession: boolean=false;
  loginForm: FormGroup = new FormGroup({});

  constructor( private authService: AuthService, private cookie:CookieService, private router:Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(7)
      ])
    })

  }

  sendLogin() {
    const { email, password } = this.loginForm.value
    this.authService.sendCredentials(email, password)
      //TODO: 200 <400
      .subscribe(responseOk => { 
        console.log('Session iniciada correcta', responseOk);
        const { tokenSession, data } = responseOk
        this.cookie.set('token', tokenSession, 4, '/') 
        this.router.navigate(['/', 'tracks'])
      },
        err => {//TODO error 400>=
          this.errorSession = true
          console.log('Ocurrio error con tu email o password');
        })

  }
  
}
