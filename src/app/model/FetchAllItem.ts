export interface FetchAllItem<T> {
  timestamp: string;
  message: string;
  status: number;
  data: T[];
}
