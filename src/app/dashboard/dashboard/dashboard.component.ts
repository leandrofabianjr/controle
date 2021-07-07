import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { OrdersService } from 'src/app/orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orders = this.ordersService.filtered;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.updateOrders();
  }

  updateOrders(): void {
    this.ordersService.filter({
      size: 3,
    });
  }
}
