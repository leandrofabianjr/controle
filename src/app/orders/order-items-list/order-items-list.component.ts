import { Component, Input, OnInit } from '@angular/core';
import { OrderItemDto } from '../dtos/order-item.dto';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss']
})
export class OrderItemsListComponent implements OnInit {

  @Input() items: OrderItemDto[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
