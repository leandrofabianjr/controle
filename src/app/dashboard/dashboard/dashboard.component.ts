import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/orders/dtos/order';
import { OrdersService } from 'src/app/orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orders?: Order[];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.updateOrders();
  }

  updateOrders(): void {
    this.ordersService
      .filter({ size: 3 })
      .subscribe((orders) => (this.orders = orders));
  }
}
