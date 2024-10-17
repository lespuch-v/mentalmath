import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:7147/api/User/';
  jwtHelper = new JwtHelperService();
  currentUser: any;
  decodedToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.currentUser = JSON.parse(localStorage.getItem('user')!);
    }
  }

  getUserName(): Observable<any> {
    const userId = this.authService.currentUser.id;
    return this.http.get(this.baseUrl + userId + '/name');
  }

  updateUserName(newUsername: string): Observable<any> {
    const userId = this.authService.currentUser.id;
    return this.http.put(`${this.baseUrl}username/${userId}`, { newUsername: newUsername });
  }
}
