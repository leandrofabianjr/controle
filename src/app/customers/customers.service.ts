import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerDto } from './dtos/customer.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  filtered = new BehaviorSubject<CustomerDto[]>([]);

  constructor(private http: HttpClient) {}

  filter(): Observable<CustomerDto[]> {
    console.log('vai filtrar');
    const token = localStorage.getItem('access-token') || '';
    const headers = { Authorization: 'Bearer ' + JSON.parse(token) };
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
}
