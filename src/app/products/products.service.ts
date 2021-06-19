import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDto } from './dtos/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  filtered = new BehaviorSubject<ProductDto[]>([]);

  constructor(private http: HttpClient) {}

  filter(): Observable<ProductDto[]> {
    console.log('vai filtrar');
    const token = localStorage.getItem('access-token') || '';
    const headers = { Authorization: 'Bearer ' + JSON.parse(token) };
    return this.http
      .get<ProductDto[]>('http://localhost:3000/products', {
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

  create(dto: ProductDto): Observable<ProductDto> {
    const token = localStorage.getItem('access-token') || '';
    const headers = { Authorization: 'Bearer ' + JSON.parse(token) };
    return this.http.post<ProductDto>('http://localhost:3000/products', dto, {
      headers,
    });
  }
}
