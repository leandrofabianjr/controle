import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CustomerDto } from './dtos/customer.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  filtered = new BehaviorSubject<CustomerDto[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  filter(): Observable<CustomerDto[]> {
    const headers = this.authService.authHeader;
    return this.http
      .get<CustomerDto[]>('http://localhost:3000/customers', {
        headers,
      })
      .pipe(
        map((res) => {
          console.log(res);
          this.filtered.next(res);
          return res;
        })
      );
  }

  create(dto: CustomerDto): Observable<CustomerDto> {
    const headers = this.authService.authHeader;
    return this.http.post<CustomerDto>('http://localhost:3000/customers', dto, {
      headers,
    });
  }
}
