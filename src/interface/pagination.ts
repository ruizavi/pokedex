export interface IPagination<T = unknown> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
