import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dropdown-with-creation',
  templateUrl: './dropdown-with-creation.component.html',
  styleUrls: ['./dropdown-with-creation.component.scss'],
})
export class DropdownWithCreationComponent implements OnInit {
  @Input() label: string = '';

  @Input() placeholder: string = '';

  @Input() control: AbstractControl = new FormControl();

  @Input() filteredItems = new BehaviorSubject<any[]>([]);

  @Output() onCreateNew = new EventEmitter<string>();

  @Output() onFilter = new EventEmitter<string>();

  filterControl = new FormControl();

  loading = false;

  selectedItem?: any;

  showNewItemButton = false;

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  constructor() {}

  ngOnInit(): void {
    this.filteredItems.subscribe((arr) => {
      this.showNewItemButton = !arr.length && this.filterControl.value?.length;
      this.loading = false;
    });
  }

  filter(term: string) {
    this.loading = true;
    this.onFilter.emit(term);
  }

  create() {
    this.onCreateNew.emit(this.filterControl.value);
  }
}
