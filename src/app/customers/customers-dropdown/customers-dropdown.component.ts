import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';
import { CustomersService } from '../customers.service';
import { Customer } from '../dtos/customer';

@Component({
  selector: 'app-customers-dropdown',
  templateUrl: './customers-dropdown.component.html',
  styleUrls: ['./customers-dropdown.component.scss'],
})
export class CustomersDropdownComponent {
  @Input() control = new FormControl();

  filtered = this.customersService.filtered;

  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}

  filter(term: string = ''): void {
    this.customersService
      .filter({ search: term, size: 10 })
      .subscribe({ error: (err) => console.error(err) });
  }

  create(data: string) {
    const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
      data,
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe((res: Customer) => {
      if (res) {
        this.filtered.next([res]);
        this.filtered.subscribe((_) => {
          this.control.setValue(res);
        });
      }
    });
  }
}
