import { Component, Input } from '@angular/core';
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
export class ProductsDropdownComponent {
  @Input() control: AbstractControl = new FormControl();

  filtered = this.productsService.filtered;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}

  filter(term: string = ''): void {
    this.productsService.filter(term).subscribe({
      error: (err) => console.error(err),
    });
  }

  create(data: string) {
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
