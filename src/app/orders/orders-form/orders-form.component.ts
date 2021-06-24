import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/products/dtos/product.dto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrderItem } from '../models/order-item';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
})
export class OrdersFormComponent {
  customerControl = this.fb.control(null, [Validators.required]);

  itemsFormArray = this.fb.array([]);

  orderForm = this.fb.group({
    customer: this.customerControl,
    dateToBeDone: [null, [Validators.required]],
    items: this.itemsFormArray,
  });

  itemForm: FormGroup;

  error?: string;

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.itemForm = this.buildNewItemForm();
  }

  private buildNewItemForm(item?: OrderItem): FormGroup {
    return this.fb.group({
      product: [item?.product, Validators.required],
      quantity: [item?.quantity, Validators.required],
    });
  }

  addItem() {
    if (this.itemForm.invalid || !this.itemForm.value) return;

    const item = this.itemForm.value as OrderItem;
    const itemForm = this.buildNewItemForm(item);
    this.itemsFormArray.push(itemForm);

    this.resetAddItemForm();
  }

  resetAddItemForm() {
    Object.keys(this.itemForm.controls).forEach((key) => {
      this.itemForm.controls[key].setValue(null);
      this.itemForm.controls[key].setErrors(null);
    });
  }

  getProductFromForm(itemForm: AbstractControl): ProductDto {
    const product = (itemForm as FormGroup).controls['product'] as FormControl;
    return product?.value;
  }

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;

    this.ordersService.create(this.orderForm.value).subscribe({
      next: (res) => {
        const date = formatDate(res.dateToBeDone, 'shortDate', 'pt-BR');
        const message = `Encomenda de ${res.customer.name} para ${date} cadastrada com sucesso`;
        this.alertService.success(message);
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.error(e);
        this.error = e?.error?.message ?? e?.message ?? 'Erro desconhecido';
      },
    });
  }
}
