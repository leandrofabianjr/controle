import { Component, Input, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss'],
})
export class OrderItemsListComponent {
  @ViewChild('tableElement') table: any;

  @Input() itemsFormArray?: FormArray;

  constructor() {}

  removeItem(index: number) {
    this.itemsFormArray?.removeAt(index);
  }
}
