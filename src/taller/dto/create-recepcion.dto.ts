import { IsNotEmpty } from 'class-validator';

export class CreateRecepcionDto {
  @IsNotEmpty()
  tipoEquipo: number;
  @IsNotEmpty()
  tipoTrabajo: number;
  @IsNotEmpty()
  fecha: Date;
  @IsNotEmpty()
  identificadorEquipo: string;
  @IsNotEmpty()
  nombreCliente: string;
  @IsNotEmpty()
  ciCliente: string;
  @IsNotEmpty()
  telefonoCliente: string;
  @IsNotEmpty()
  trabajador: number;
}
