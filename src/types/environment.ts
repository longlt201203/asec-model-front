import { Factor } from "./factor";

export interface ImplementedFactor {
  id: string;
  factor: Factor | null;
  value: number;
}

export interface Environment {
  id: string;
  name: string;
  implementedFactors: ImplementedFactor[];
}

export interface CreateEnvironmentDto
  extends Omit<Environment, "id" | "implementedFactors"> {}

export interface UpdateEnvironmentDto extends CreateEnvironmentDto {}

export enum UpdateEnvironmentImplementedFactorRequestOperationEnum {
  ADD,
  REMOVE,
  UPDATE,
}

export interface ImplementedFactorDto {
  factor: string;
  value?: number;
}

export interface UpdateEnvironmentImplementedFactorDto {
  operation: UpdateEnvironmentImplementedFactorRequestOperationEnum;
  implementedFactor: ImplementedFactorDto;
}
