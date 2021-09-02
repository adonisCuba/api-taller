import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMercanciaDto {
  @IsNotEmpty()
  codigo: string;
  @IsNotEmpty()
  nombre: string;
  @IsNotEmpty()
  @IsNumber()
  precio_entrada: number;
  @IsNotEmpty()
  @IsNumber()
  precio_salida: number;
  @IsNotEmpty()
  @IsNumber()
  existencia: number;
  @IsNotEmpty()
  almacen: number;
}
