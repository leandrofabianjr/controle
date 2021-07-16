import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base/base.service';
import { Product } from './dtos/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService<Product> {
  urlCollection = 'products';

  modelToDto(model: Product) {
    return {
      name: model.name,
      unitOfMeasurement: model.unitOfMeasurement,
      value: model.value,
    };
  }
}
