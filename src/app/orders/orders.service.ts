import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { OrderItemDto } from './dtos/order-item.dto';
import { OrderDto } from './dtos/order.dto';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  filtered = new BehaviorSubject<OrderDto[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  filter(
    search: string = '',
    size = 5,
    page = 0,
    offset = size * page
  ): Observable<OrderDto[]> {
    const headers = this.authService.authHeader;
    const params = new HttpParams()
      .set('limit', size)
      .set('offset', offset)
      .set('search', search);
    console.log('foi');
    return this.http
      .get<OrderDto[]>(`${environment.apiUrl}/orders`, {
        params,
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

  create(model: Order): Observable<Order> {
    const body = this.modelToDto(model);
    const headers = this.authService.authHeader;
    return this.http.post<Order>(`${environment.apiUrl}/orders`, body, {
      headers,
    });
  }

  private modelToDto(model: Order): OrderDto {
    const dto: OrderDto = {
      customer: model.customer.id,
      dateToBeDone: model.dateToBeDone.toISOString(),
      items: model.items.map(
        (i) => ({ product: i.product.id, quantity: i.quantity } as OrderItemDto)
      ),
    };
    console.log('model', model);
    console.log('dto', dto);
    return dto;
  }
}
