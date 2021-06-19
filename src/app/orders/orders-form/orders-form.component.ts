import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
    quantity: [null, Validators.required],
    product: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;
  }

  addItem() {
    const itemForm = this.fb.group({
      quantity: [null, Validators.required],
      product: [null, Validators.required],
    });
    this.itemsFormArray.push(itemForm);
  }

  productControlFrom(itemForm: AbstractControl): FormControl {
    return (itemForm as FormGroup).controls['product'] as FormControl;
  }
}
