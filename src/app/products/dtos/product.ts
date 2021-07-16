export enum UnitOfMeasurementEnum {
  un = 'un',
  g = 'g',
  kg = 'kg',
  ml = 'ml',
  l = 'l',
}

export interface Product {
  id: string;
  name: string;
  unitOfMeasurement: UnitOfMeasurementEnum;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}
