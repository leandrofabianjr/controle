import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
})
export class OrdersFormComponent implements OnInit {
  customerControl = this.fb.control(null, [Validators.required]);

  orderForm = this.fb.group({
    customer: this.customerControl,
    dateToBeDone: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;
  }
}
