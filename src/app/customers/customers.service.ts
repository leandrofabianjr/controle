import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CustomerDto } from './dtos/customer.dto';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  filter() {
    const token = localStorage.getItem('access-token');
    const headers = { Authorization: 'Bearer ' + token };
    return this.http.get<CustomerDto[]>('http://localhost:3000/customers', {
      headers,
    });
  }
}
