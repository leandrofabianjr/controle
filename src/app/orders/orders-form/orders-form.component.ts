import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/customers/customers.service';
import { CustomerDto } from 'src/app/customers/dtos/customer.dto';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
})
export class OrdersFormComponent implements OnInit {
  orderForm = this.fb.group({
    customer: ['', [Validators.required]],
    dateToBeDone: ['', [Validators.required]],
  });

  customers?: CustomerDto[];

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.customersService.filter().subscribe((res) => (this.customers = res));
  }

  onSubmit() {}
}
