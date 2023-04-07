import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  saveUser(user: User): Observable<void> {
    return this.http.post<void>('/api/users', user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
