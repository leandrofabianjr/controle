import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ProductDto } from 'src/app/products/dtos/product.dto';
import { OrderItemDto } from '../dtos/order-item.dto';
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

  addItemForm: FormGroup;

  error?: string;

  constructor(private fb: FormBuilder, private ordersService: OrdersService) {
    this.addItemForm = this.buildNewItemForm();
  }

  private buildNewItemForm(item?: OrderItem): FormGroup {
    return this.fb.group({
      product: [item?.product, Validators.required],
      quantity: [item?.quantity, Validators.required],
    });
  }

  addItem() {
    if (this.addItemForm.invalid || !this.addItemForm.value) return;

    const item = this.addItemForm.value as OrderItem;
    const itemForm = this.buildNewItemForm(item);
    this.itemsFormArray.push(itemForm);

    this.resetAddItemForm();
  }

  resetAddItemForm() {
    Object.keys(this.addItemForm.controls).forEach((key) => {
      this.addItemForm.controls[key].setValue(null);
      this.addItemForm.controls[key].setErrors(null);
    });
  }

  getProductFromForm(itemForm: AbstractControl): ProductDto {
    const product = (itemForm as FormGroup).controls['product'] as FormControl;
    return product?.value;
  }

  removeItem(index: any) {
    console.log(this.itemsFormArray, index);
  }

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;

    console.log(this.orderForm.value);

    this.ordersService.create(this.orderForm.value).subscribe({
      next: (res) => console.log(res),
      error: (e) => {
        console.error(e);
        this.error = e?.error?.message ?? e?.message ?? 'Erro desconhecido';
      },
    });
  }
}
