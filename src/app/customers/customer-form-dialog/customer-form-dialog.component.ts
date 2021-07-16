import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../customers.service';
import { Customer } from '../dtos/customer';

@Component({
  selector: 'app-customer-form-dialog',
  templateUrl: './customer-form-dialog.component.html',
  styleUrls: ['./customer-form-dialog.component.scss'],
})
export class CustomerFormDialogComponent implements OnInit {
  customerForm = this.fb.group({
    name: [this.name, Validators.required],
    address: [''],
    phone: [''],
  });

  error?: string;

  constructor(
    private dialogRef: MatDialogRef<CustomerFormDialogComponent, Customer>,
    private fb: FormBuilder,
    private customersService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('verificando');
    if (this.customerForm.invalid || !this.customerForm.value) return;
    console.log(this.customerForm.value);
    this.customersService.create(this.customerForm.value).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (e) => {
        console.error(e);
        this.error = e?.error?.message ?? e?.message ?? 'Erro desconhecido';
      },
    });
  }
}
