import axios, { AxiosRequestConfig } from "axios";
import { ApiResponseDto } from "../types";

export async function axiosGet<T>(url: string, config?: AxiosRequestConfig) {
  const response = await axios.get<ApiResponseDto<T>>(url, config);
  return response.data;
}

export async function axiosPost<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
) {
  const response = await axios.post<ApiResponseDto<T>>(url, data, config);
  return response.data;
}

export async function axiosPut<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
) {
  const response = await axios.put<ApiResponseDto<T>>(url, data, config);
  return response.data;
}

export async function axiosDelete<T>(url: string, config?: AxiosRequestConfig) {
  const response = await axios.delete<ApiResponseDto<T>>(url, config);
  return response.data;
}
