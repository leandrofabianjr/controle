import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { CustomerDto } from './dtos/customer.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  filtered = new BehaviorSubject<CustomerDto[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  filter(search: string = ''): Observable<CustomerDto[]> {
    const headers = this.authService.authHeader;
    const params = new HttpParams().set('limit', 5).set('search', search);
    const config = {
      params,
      headers,
    };
    return this.http
      .get<CustomerDto[]>(`${environment.apiUrl}/customers`, config)
      .pipe(
        map((res) => {
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
