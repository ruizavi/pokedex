export interface IPaginationResponse<T = unknown> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface IPagination<T = unknown> {
  limit: number;
  offset: number;
  page: number;
  total: number;
}
