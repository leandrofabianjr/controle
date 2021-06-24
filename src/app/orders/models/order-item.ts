import { ProductDto } from 'src/app/products/dtos/product.dto';

export interface OrderItem {
  product: ProductDto;
  quantity: number;
}
