export interface ApiResponseDto<T> {
  data: T;
  pagination?: any;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  detail: any;
  status: number;
}
