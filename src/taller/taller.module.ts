import { TipoEquipoRepository } from './repositories/tipo_equipo.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEquipoRepository])],
})
export class TallerModule {}
