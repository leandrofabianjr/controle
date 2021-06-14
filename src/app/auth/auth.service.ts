import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from './dtos/user.dto';

interface AccessTokenDto {
  access: string;
  user: UserDto;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get currentUser(): UserDto | undefined {
    const data = localStorage.getItem('currentUser');
    if (!data) return undefined;
    return JSON.parse(data) as UserDto;
  }

  login(email: string, password: string): Observable<void> {
    console.log('fazendo login');
    return this.http
      .post<AccessTokenDto>('http://localhost:3000/jwt/token', {
        username: email,
        password,
      })
      .pipe(
        map((res) => {
          console.log('Resposta:', res);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('access-token', JSON.stringify(res.access));
        })
      );
  }
}
