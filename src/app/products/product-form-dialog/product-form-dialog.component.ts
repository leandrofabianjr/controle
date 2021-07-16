import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product, UnitOfMeasurementEnum } from '../dtos/product';
import { ProductsService } from '../products.service';
import { CurrencyMaskConfig } from 'ngx-currency';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  productForm = this.fb.group({
    name: [this.name, Validators.required],
    unitOfMeasurement: [null, Validators.required],
    value: [null, Validators.required],
  });

  errorMessage?: string;

  get unitOfMeasurementsValues(): string[] {
    return Object.keys(UnitOfMeasurementEnum);
  }

  currencyMaskOptions: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: true,
  };

  constructor(
    private dialogRef: MatDialogRef<ProductFormDialogComponent, Product>,
    private fb: FormBuilder,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('verificando');
    if (this.productForm.invalid || !this.productForm.value) return;
    console.log(this.productForm.value);
    this.productsService.create(this.productForm.value).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (error) => {
        console.error(error);
        this.errorMessage =
          error?.error?.message ?? error?.message ?? 'Erro desconhecido';
        console.log(this.errorMessage);
      },
    });
  }
}
