import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from 'src/app/products/dtos/product.dto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements AfterViewInit {
  customerControl = this.fb.control(null, [Validators.required]);
  itemsFormArray = this.fb.array([]);
  orderForm = this.fb.group({
    customer: this.customerControl,
    dateToBeDone: [null, [Validators.required]],
    items: this.itemsFormArray,
  });

  itemForm: FormGroup;

  id?: string;
  loading = true;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private alertService: AlertService
  ) {
    this.itemForm = this.buildNewItemForm();
  }
  ngAfterViewInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (!this.id) return;

    this.ordersService.find(this.id).subscribe({
      next: this.initForm,
      error: (err) => {
        console.error(err);
        const message =
          err?.error?.message ??
          err?.message ??
          'Não foi possível carregar os dados da encomenda';
        this.alertService.error(message);
        this.router.navigate(['u', 'orders']);
      },
    });
  }

  private initForm(order: Order) {
    this.orderForm.setValue(order);
  }

  private buildNewItemForm(item?: OrderItem): FormGroup {
    return this.fb.group({
      product: [item?.product, Validators.required],
      quantity: [item?.quantity, Validators.required],
    });
  }

  addItem() {
    if (this.itemForm.invalid || !this.itemForm.value) return;

    const item = this.itemForm.value as OrderItem;
    const itemForm = this.buildNewItemForm(item);
    this.itemsFormArray.push(itemForm);

    this.resetAddItemForm();
  }

  resetAddItemForm() {
    Object.keys(this.itemForm.controls).forEach((key) => {
      this.itemForm.controls[key].setValue(null);
      this.itemForm.controls[key].setErrors(null);
    });
  }

  getProductFromForm(itemForm: AbstractControl): ProductDto {
    const product = (itemForm as FormGroup).controls['product'] as FormControl;
    return product?.value;
  }

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;

    this.ordersService.create(this.orderForm.value).subscribe({
      next: (res) => {
        const date = formatDate(res.dateToBeDone, 'shortDate', 'pt-BR');
        const message = `Encomenda de ${res.customer.name} para ${date} cadastrada com sucesso`;
        this.alertService.success(message);
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.error(e);
        this.error = e?.error?.message ?? e?.message ?? 'Erro desconhecido';
      },
    });
  }
}
