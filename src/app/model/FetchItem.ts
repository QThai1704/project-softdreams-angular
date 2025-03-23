export interface ApiResponse<T> {
  timestamp: string;
  message: string;
  status: number;
  data: T;
}
