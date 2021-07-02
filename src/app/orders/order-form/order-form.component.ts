import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class OrderFormComponent implements OnInit {
  orderForm = this.fb.group({
    customer: [null, [Validators.required]],
    dateToBeDone: [null, [Validators.required]],
    items: this.fb.array([]),
  });

  itemForm: FormGroup;

  id?: string;
  loading = false;
  error?: string;

  get customerControl(): FormControl {
    return this.orderForm.controls?.customer as FormControl;
  }

  get itemsFormArray(): FormArray {
    return this.orderForm.controls?.items as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private alertService: AlertService
  ) {
    this.itemForm = this.buildNewItemForm();
  }

  private initForm(order: Order) {
    const { customer, dateToBeDone, items } = order;
    const itemsFormGroups = items.map((i) => this.buildNewItemForm(i));

    this.orderForm.controls['customer'].setValue(customer);
    this.orderForm.controls['dateToBeDone'].setValue(dateToBeDone);
    this.orderForm.controls['items'] = this.fb.array(itemsFormGroups);

    this.loading = false;
  }

  private loadingItemError(err: any) {
    console.error(err);
    const message =
      err?.error?.message ??
      err?.message ??
      'Não foi possível carregar os dados da encomenda';
    this.alertService.error(message);
    this.router.navigate(['u', 'orders']);
  }

  private buildNewItemForm(item?: OrderItem): FormGroup {
    return this.fb.group({
      product: [item?.product, Validators.required],
      quantity: [item?.quantity, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (!this.id) return;

    this.loading = true;
    this.ordersService.find(this.id).subscribe({
      next: (order) => this.initForm(order),
      error: (err) => this.loadingItemError(err),
    });
  }

  addItem() {
    if (this.itemForm.invalid || !this.itemForm.value) return;

    const item = this.itemForm.value as OrderItem;
    const itemForm = this.buildNewItemForm(item);
    (this.orderForm.controls.items as FormArray).push(itemForm);

    this.resetAddItemForm();
  }

  resetAddItemForm() {
    const controls = this.itemForm.controls;
    Object.keys(controls).forEach((key) => {
      controls[key].setValue(null);
      controls[key].setErrors(null);
    });
  }

  getProductFromForm(itemForm: AbstractControl): ProductDto {
    const product = (itemForm as FormGroup).controls['product'] as FormControl;
    return product?.value;
  }

  onSubmit() {
    if (this.orderForm.invalid || !this.orderForm.value) return;

    const value = this.orderForm.value;
    value.items = this.orderForm.controls.items.value;

    const response = this.id
      ? this.ordersService.edit(this.id, value)
      : this.ordersService.create(value);

    response.subscribe({
      next: (res) => {
        const date = formatDate(res.dateToBeDone, 'shortDate', 'pt-BR');
        const message = `Encomenda de ${res.customer.name} para ${date} salva com sucesso`;
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
