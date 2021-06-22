import { ProductDto } from "src/app/products/dtos/product.dto";

export interface OrderItemDto {
  product: ProductDto;
  quantity: number;
}
