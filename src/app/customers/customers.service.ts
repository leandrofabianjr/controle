import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../shared/base/base.service';
import { Customer } from './dtos/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends BaseService<Customer> {
  urlCollection = 'customers';

  modelToDto(model: Customer) {
    return {
      name: model.name,
      address: model.address,
      phone: model.phone,
    };
  }
}
