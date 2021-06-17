import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomersDropdownComponent } from './customers-dropdown/customers-dropdown.component';
import { CustomerFormDialogComponent } from './customer-form-dialog/customer-form-dialog.component';
import { SharedModule } from '../shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [CustomersDropdownComponent, CustomerFormDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [CustomersDropdownComponent],
})
export class CustomersModule {}
