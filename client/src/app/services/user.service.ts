import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) { }

  getUserName(id: number): Observable<any> {
    return this.http.get(this.baseUrl + id + '/name');
  }

  updateUserName(id: number, newUsername: string): Observable<any> {
    return this.http.put(this.baseUrl + id + '/name', { newUsername });
  }
}
