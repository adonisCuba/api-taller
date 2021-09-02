import { IsNotEmpty } from 'class-validator';

export class CreateTipoEquipoDto {
  @IsNotEmpty()
  nombre: string;
}
