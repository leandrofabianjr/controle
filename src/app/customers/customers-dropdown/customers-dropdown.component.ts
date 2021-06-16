import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CustomersService } from '../customers.service';
import { CustomerDto } from '../dtos/customer.dto';

@Component({
  selector: 'app-customers-dropdown',
  templateUrl: './customers-dropdown.component.html',
  styleUrls: ['./customers-dropdown.component.scss'],
})
export class CustomersDropdownComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();

  inputValue?: string;

  filtered = this.customersService.filtered;

  loading = true;

  constructor(private customersService: CustomersService) {}

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

  onSelect(value: CustomerDto): void {
    console.log(value, this.inputValue);
    this.control.setValue(value?.id);
  }
}
