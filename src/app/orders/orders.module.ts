import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersFormComponent } from './orders-form/orders-form.component';
import { OrdersComponent } from './orders/orders.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [OrdersFormComponent, OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class OrdersModule {}
