import { OrderItemDto } from './order-item.dto';

export interface OrderDto {
  customer: string;
  items: OrderItemDto[];
  dateToBeDone: string;
}
