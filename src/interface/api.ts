export interface ApiResponse<T = never> {
  message: string;
  data: T;
}
