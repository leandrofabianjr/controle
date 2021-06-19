import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { ProductsService } from '../products.service';
import { ProductDto } from '../dtos/product.dto';

@Component({
  selector: 'app-products-dropdown',
  templateUrl: './products-dropdown.component.html',
  styleUrls: ['./products-dropdown.component.scss'],
})
export class ProductsDropdownComponent implements OnInit {
  @Input() control: AbstractControl = new FormControl();

  loading = true;

  selectedItem?: ProductDto;

  filtered = this.productsService.filtered;

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}

  displayWith = (value: ProductDto) => value?.name;

  ngOnInit(): void {
    this.filter();
    this.filtered.subscribe((_) => (this.loading = false));
  }

  filter(): void {
    this.loading = true;
    this.productsService
      .filter()
      .subscribe({ error: (err) => console.error(err) });
  }

  onInputChange(): void {}

  create() {
    const data = this.control.value;
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      data,
      minWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe((res: ProductDto) => {
      if (res) {
        this.filtered.next([res]);
        this.filtered.subscribe((_) => {
          this.control.setValue(res);
        });
      }
    });
  }
}
