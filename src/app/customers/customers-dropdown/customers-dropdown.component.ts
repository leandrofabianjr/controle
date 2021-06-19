import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';
import { CustomersService } from '../customers.service';
import { CustomerDto } from '../dtos/customer.dto';

@Component({
  selector: 'app-customers-dropdown',
  templateUrl: './customers-dropdown.component.html',
  styleUrls: ['./customers-dropdown.component.scss'],
})
export class CustomersDropdownComponent implements OnInit {
  @Input() control = new FormControl();

  loading = true;

  selectedItem?: CustomerDto;

  filtered = this.customersService.filtered;

  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}

  displayWith = (value: CustomerDto) => value?.name;

  ngOnInit(): void {
    this.filter();
    this.filtered.subscribe((_) => (this.loading = false));
  }

  filter(): void {
    this.loading = true;
    this.customersService
      .filter()
      .subscribe({ error: (err) => console.error(err) });
  }

  onInputChange(): void {}

  create() {
    const data = this.control.value;
    const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
      data,
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe((res: CustomerDto) => {
      if (res) {
        this.filtered.next([res]);
        this.filtered.subscribe((_) => {
          this.control.setValue(res);
        });
      }
    });
  }
}
