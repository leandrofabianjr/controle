import { HttpParams } from '@angular/common/http';

export interface FilterOptions {
  search?: string;
  size?: number;
  page?: number;
}

export function buildFilterHttpParams(options: FilterOptions) {
  let fromObject: any = {};

  if (options?.size) {
    fromObject.limit = options.size;

    if (options?.page) {
      fromObject.offset = options.size * options.page;
    }
  }

  if (options?.search) {
    fromObject.search = options.search;
  }

  return new HttpParams({ fromObject });
}
