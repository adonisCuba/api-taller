import { IsNotEmpty } from 'class-validator';

export class CreataTrabajoEquipoDto {
  @IsNotEmpty()
  trabajo: number;
  @IsNotEmpty()
  equipo: number;
  @IsNotEmpty()
  precio: number;
}
