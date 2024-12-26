import { Environment, UpdateEnvironmentImplementedFactorDto } from "../types";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axios.queries";

export async function getEnvironments() {
  const response = await axiosGet<Environment[]>("/api/environment");
  return response.data;
}

export async function getEnvironment(id: string) {
  const response = await axiosGet<Environment>(`/api/environment/${id}`);
  return response.data;
}

export async function createEnvironment(environment: Environment) {
  const response = await axiosPost("/api/environment", environment);
  return response.data;
}

export async function updateEnvironment(environment: Environment) {
  const response = await axiosPut(
    `/api/environment/${environment.id}`,
    environment
  );
  return response.data;
}

export async function deleteEnvironment(id: string) {
  const response = await axiosDelete(`/api/environment/${id}`);
  return response.data;
}

export async function updateEnvironmentImplementedFactor(
  id: string,
  dto: UpdateEnvironmentImplementedFactorDto
) {
  const response = await axiosPut(`/api/environment/${id}/factor`, dto);
  return response.data;
}
