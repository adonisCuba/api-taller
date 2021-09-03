import { IsString } from 'class-validator';

export class CreateTrabajadorDto {
  @IsString()
  nombre: string;
  ci: string;
  @IsString()
  telefono: string;
}
