import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductDto } from 'src/app/products/dtos/product.dto';
import { OrderItemDto } from '../dtos/order-item.dto';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
})
export class OrdersFormComponent implements OnInit {
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

  orderItems: OrderItemDto[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;
  }

  addItem() {
    if (this.addItemForm.invalid || !this.addItemForm.value) return;
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
    this.orderItems.push(item);
  }

  getProductFromForm(itemForm: AbstractControl): ProductDto {
    const product = (itemForm as FormGroup).controls['product'] as FormControl;
    return product?.value;
  }
}
