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

  filterControl = new FormControl();

  loading = false;

  selectedItem?: ProductDto;

  filtered = this.productsService.filtered;

  showNewItemButton = false;

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filtered.subscribe((arr) => (this.showNewItemButton = arr.length > 0));
  }

  displayWith = (value: ProductDto) => value?.name;

  filter(term: string = ''): void {
    this.showNewItemButton = false;
    this.loading = true;
    this.productsService.filter(term).subscribe({
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  create() {
    const data = this.filterControl.value;
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
