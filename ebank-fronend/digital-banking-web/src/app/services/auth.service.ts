import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any;

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    let option = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(
      environment.backendHost + '/auth/login',
      params,
      option
    );
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-Token'];
    let decodeJwt: any = jwtDecode(this.accessToken);
    this.username = decodeJwt.sub;
    this.roles = decodeJwt.scope;
    window.localStorage.setItem('jwt-token', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    window.localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem('jwt-token');
    if (token) {
      this.loadProfile({ 'access-Token': token });
      this.router.navigateByUrl('/admin/customers');
    }
  }
}
