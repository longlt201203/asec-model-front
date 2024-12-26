import { Factor } from "../types";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axios.queries";

export async function getFactors() {
  const url = `/api/factor`;
  const response = await axiosGet<Factor[]>(url);
  return response.data;
}

export async function createFactor(factor: Factor) {
  const url = `/api/factor`;
  const response = await axiosPost(url, factor);
  return response.data;
}

export async function updateFactor(factor: Factor) {
  const url = `/api/factor/${factor.id}`;
  const response = await axiosPut(url, factor);
  return response.data;
}

export async function deleteFactor(id: string) {
  const url = `/api/factor/${id}`;
  const response = await axiosDelete(url);
  return response.data;
}
