import { Customer } from 'src/app/customers/dtos/customer';
import { OrderItem } from './order-item';

export interface Order {
  customer: Customer;
  items: OrderItem[];
  dateToBeDone: Date;
}
