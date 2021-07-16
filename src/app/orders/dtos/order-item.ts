import { Product } from 'src/app/products/dtos/product';

export interface OrderItem {
  product: Product;
  quantity: number;
}
