import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private url = 'http://localhost:3000/'
  private loginUrl = this.url + 'login';
  private registerUrl = this.url + 'register';
  private forgotPasswordUrl = this.url + 'forgotPassword'

  constructor(private http: HttpClient) { }

  onLogin(user: any): any {
    return this.http.post(this.loginUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  onRegister(user: any): any{
    const result = this.http.post(this.registerUrl, user);
    return result;
  }

  forgotPassword(user: any): any {
    return this.http.post(this.forgotPasswordUrl, user);
  }
}
