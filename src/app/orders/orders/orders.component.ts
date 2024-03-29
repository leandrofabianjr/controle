import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  displayedColumns = ['customer', 'date'];
  pageSizeOptions = [5, 10, 20];
  size = this.pageSizeOptions[0];
  page = 0;
  search = '';

  loading = false;

  filtered = this.ordersService.filtered;
  pagination = this.ordersService.pagination;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.filter();
    this.filtered.subscribe(() => (this.loading = false));
  }

  filter() {
    this.loading = true;
    this.ordersService
      .filter({
        search: this.search,
        size: this.size,
        page: this.page,
      })
      .subscribe({
        error: (err) => console.error(err),
      });
  }

  changePage({ pageIndex, pageSize }: PageEvent) {
    this.page = pageIndex;
    this.size = pageSize;
    this.filter();
  }
}
