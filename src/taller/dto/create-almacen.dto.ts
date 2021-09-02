import { IsNotEmpty } from 'class-validator';

export class CreateAlmacenDto {
  @IsNotEmpty()
  nombre: string;
}
