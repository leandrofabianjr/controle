export class PaginationData {
  constructor(
    public total: number = 0,
    public limit?: number,
    public offset?: number
  ) {}

  get page(): number {
    if (!this.offset || !this.limit) return 0;

    return this.offset / this.limit;
  }

  get pageSize(): number | undefined {
    return this.limit;
  }
}
