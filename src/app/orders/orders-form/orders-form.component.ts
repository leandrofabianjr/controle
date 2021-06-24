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

  addItemForm = this.fb.group({
    product: [null, Validators.required],
    quantity: [null, Validators.required],
  });

  private orderItems: OrderItemDto[] = [];
  orderItemsSubject = new BehaviorSubject<OrderItemDto[]>([]);

  error?: string;

  constructor(private fb: FormBuilder, private ordersService: OrdersService) {}

  addItem() {
    if (this.addItemForm.invalid || !this.addItemForm.value) return;
    console.log('sss');
    const form = this.addItemForm.controls;
    const itemForm = this.fb.group({
      product: form['product'],
      quantity: form['quantity'],
    });
    this.itemsFormArray.push(itemForm);

    const item: OrderItemDto = {
      product: form['product'].value,
      quantity: form['quantity'].value,
    };
    this.orderItems.unshift(item);
    this.orderItemsSubject.next(this.orderItems);

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
    this.orderItems.splice(index, 1);
    this.orderItemsSubject.next(this.orderItems);
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
