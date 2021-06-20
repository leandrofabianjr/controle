import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductDto } from 'src/app/products/dtos/product.dto';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;
  }

  addItem() {
    if (this.addItemForm.invalid || !this.addItemForm.value) return;
    const itemForm = this.fb.group({
      product: this.addItemForm.controls['product'],
      quantity: this.addItemForm.controls['quantity'],
    });
    this.itemsFormArray.push(itemForm);
  }

  getProductFromForm(itemForm: AbstractControl): ProductDto {
    const product = (itemForm as FormGroup).controls['product'] as FormControl;
    return product?.value;
  }
}
