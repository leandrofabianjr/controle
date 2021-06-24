import { CustomerDto } from 'src/app/customers/dtos/customer.dto';
import { OrderItem } from './order-item';

export interface Order {
  customer: CustomerDto;
  items: OrderItem[];
  dateToBeDone: Date;
}
