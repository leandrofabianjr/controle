import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  displayedColumns = ['customer', 'date', 'actions'];
  pageSizeOptions = [5, 10, 20];
  size = this.pageSizeOptions[0];
  page = 0;
  search = '';

  loading = false;

  filtered = this.ordersService.filtered;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.filter();
    this.filtered.subscribe({ complete: () => (this.loading = false) });
  }

  filter() {
    this.loading = true;
    this.ordersService.filter(this.search, this.size, this.page).subscribe({
      error: (err) => console.error(err),
    });
  }

  changePage({ pageIndex, pageSize }: PageEvent) {
    this.page = pageIndex;
    this.size = pageSize;
    this.filter();
  }
}
