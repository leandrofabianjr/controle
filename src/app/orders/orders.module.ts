import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { OrdersComponent } from './orders/orders.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomersModule } from '../customers/customers.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ProductsModule } from '../products/products.module';
import { OrderItemsListComponent } from './order-items-list/order-items-list.component';

@NgModule({
  declarations: [OrdersFormComponent, OrdersComponent, OrderItemsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    OrdersRoutingModule,
    SharedModule,
    CustomersModule,
    ProductsModule,

    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTableModule,
  ],
})
export class OrdersModule {}
