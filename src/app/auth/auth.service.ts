import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDto } from './dtos/user.dto';
import { Router } from '@angular/router';

interface AccessTokenDto {
  access: string;
  user: UserDto;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get authHeader(): HttpHeaders {
    const token = localStorage.getItem('access-token');
    if (token) {
      return new HttpHeaders({ Authorization: 'Bearer ' + JSON.parse(token) });
    }
    return new HttpHeaders();
  }

  constructor(private http: HttpClient, private router: Router) {}

  get currentUser(): UserDto | undefined {
    const data = localStorage.getItem('user');
    if (!data) return undefined;
    return JSON.parse(data) as UserDto;
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<AccessTokenDto>('http://localhost:3000/jwt/token', {
        username: email,
        password,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('access-token', JSON.stringify(res.access));
        })
      );
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    this.router.navigate(['/login']);
  }

  check(): Observable<boolean> {
    const headers = this.authHeader;
    return this.http
      .get('http://localhost:3000/jwt/check', { headers })
      .pipe(map(_ => true), catchError(err => {
        if (err?.status != 401) {
          console.error(err);
        }
        return of(false);
      }));
  }
}
