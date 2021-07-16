import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import {
  buildFilterHttpParams,
  FilterOptions,
} from '../interfaces/filter-options';
import { PaginatedResponse } from '../interfaces/paginated-response';
import { PaginationData } from '../interfaces/pagination-data';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  filtered = new BehaviorSubject<T[]>([]);
  pagination = new BehaviorSubject<PaginationData>(new PaginationData());

  constructor(private http: HttpClient, private authService: AuthService) {}

  abstract urlCollection: string;

  abstract modelToDto(model: T): any;

  dtoToModel(dto: any): T {
    return dto;
  }

  filter(options: FilterOptions): Observable<T[]> {
    const headers = this.authService.authHeader;
    const params = buildFilterHttpParams(options);

    return this.http
      .get<PaginatedResponse<T>>(
        `${environment.apiUrl}/${this.urlCollection}`,
        { params, headers }
      )
      .pipe(
        map(({ data, total, limit, offset }) => {
          console.log(data);
          this.filtered.next(data);
          this.pagination.next(new PaginationData(total, limit, offset));
          return data;
        })
      );
  }

  find(id: string): Observable<T> {
    const headers = this.authService.authHeader;
    return this.http
      .get<T>(`${environment.apiUrl}/${this.urlCollection}/${id}`, {
        headers,
      })
      .pipe(map(this.dtoToModel));
  }

  create(model: T): Observable<T> {
    const body = this.modelToDto(model);
    const headers = this.authService.authHeader;
    return this.http
      .post<T>(`${environment.apiUrl}/${this.urlCollection}`, body, {
        headers,
      })
      .pipe(map(this.dtoToModel));
  }

  edit(id: string, model: T): Observable<T> {
    const body = this.modelToDto(model);
    const headers = this.authService.authHeader;
    return this.http
      .put<T>(`${environment.apiUrl}/${this.urlCollection}/${id}`, body, {
        headers,
      })
      .pipe(map(this.dtoToModel));
  }
}
