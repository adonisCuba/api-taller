import { IsNumber } from 'class-validator';

export class FilterMercanciaDto {
  @IsNumber()
  almacen: number;
  @IsNumber()
  start: number;
  @IsNumber()
  limit: number;
  nombre: string;
}
