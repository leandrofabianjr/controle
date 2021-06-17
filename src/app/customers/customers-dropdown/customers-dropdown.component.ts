import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
  @Input() control: AbstractControl = new FormControl();

  loading = true;

  selectedItem?: CustomerDto;

  inputValue?: string;

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

  onSelect(): void {
    console.log(this.selectedItem, this.inputValue);
    this.control.setValue(this.selectedItem?.id);
  }

  create() {
    const data = this.inputValue;
    const dialogRef = this.dialog.open(CustomerFormDialogComponent, { data });

    dialogRef.afterClosed().subscribe((res: CustomerDto) => {
      console.log(res);
      this.filtered.next([res]);
      this.selectedItem = res;
      this.onSelect();
    });
  }
}
