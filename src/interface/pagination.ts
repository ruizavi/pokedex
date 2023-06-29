export interface Pagination<T = unknown> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
