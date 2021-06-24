import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent {
  @ViewChild('tableElement') table: any;

  @Input() itemsFormArray?: FormArray;

  @Output() onRemoveItem = new EventEmitter<number>();

  constructor() {}
}
