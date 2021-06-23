import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItemDto } from '../dtos/order-item.dto';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent {
  @ViewChild('tableElement') table: any;

  @Input() items = new BehaviorSubject<OrderItemDto[]>([]);

  @Output() onRemoveItem = new EventEmitter<number>();

  constructor() {}

  print() {
    console.log(this.items);
  }
}
