export interface FetchItem<T> {
  timestamp: string;
  message: string;
  status: number;
  data: T;
}
