import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDto } from './dtos/product.dto';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  filtered = new BehaviorSubject<ProductDto[]>([]);

  constructor(private http: HttpClient) {}

  filter(search: string = ''): Observable<ProductDto[]> {
    const token = localStorage.getItem('access-token') || '';
    const headers = { Authorization: 'Bearer ' + JSON.parse(token) };
    const params = new HttpParams().set('limit', 5).set('search', search);
    const config = {
      params,
      headers,
    };
    return this.http
      .get<ProductDto[]>(`${environment.apiUrl}/products`, config)
      .pipe(
        map((res) => {
          this.filtered.next(res);
          return res;
        })
      );
  }

  create(body: ProductDto): Observable<ProductDto> {
    const token = localStorage.getItem('access-token') || '';
    const headers = { Authorization: 'Bearer ' + JSON.parse(token) };
    const config = { headers };
    return this.http.post<ProductDto>(
      `${environment.apiUrl}/products`,
      body,
      config
    );
  }
}
