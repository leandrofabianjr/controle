import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from '../shared/base/base.service';
import { PaginationData } from '../shared/interfaces/pagination-data';
import { Order } from './dtos/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseService<Order> {
  urlCollection = 'orders';
  filtered = new BehaviorSubject<Order[]>([]);
  pagination = new BehaviorSubject<PaginationData>(new PaginationData());

  dtoToModel(model: Order): Order {
    model.dateToBeDone = new Date(model.dateToBeDone);
    return model;
  }

  modelToDto(model: Order): any {
    return {
      customer: model.customer.id,
      dateToBeDone: model.dateToBeDone.toISOString(),
      items: model.items.map((i) => ({
        product: i.product.id,
        quantity: i.quantity,
      })),
    };
  }
}
