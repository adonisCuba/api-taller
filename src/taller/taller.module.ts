import { TipoEquipoService } from './services/tipo_equipo.service';
import { TipoEquipoController } from './controllers/tipo_equipo.controller';
import { TipoEquipoRepository } from './repositories/tipo_equipo.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TipoTrabajoRepository } from './repositories/tipo_trabajo.repository';
import { TipoTrabajoController } from './controllers/tipo_trabajo.controller';
import { TipoTrabajoService } from './services/tipo_trabajo.service';
import { TrabajoEquipoRepository } from './repositories/trabajo_equipo.repository';
import { TrabajoEquipoController } from './controllers/trabajo_equipo.controller';
import { TrabajoEquipoService } from './services/trabajo_equipo.service';
import { AlmacenRepository } from './repositories/almacen.repository';
import { AlmacenController } from './controllers/almacen.controller';
import { AlmacenService } from './services/almacen.service';
import { MercanciaRepository } from './repositories/mercancia.repository';
import { MercanciaController } from './controllers/mercancia.controller';
import { MercanciaService } from './services/mercancia.service';
import { TrabajadorRepository } from './repositories/trabajador.repository';
import { TrabajadorController } from './controllers/trabajador.controller';
import { TrabajadorService } from './services/trabajador.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipoEquipoRepository,
      TipoTrabajoRepository,
      TrabajoEquipoRepository,
      AlmacenRepository,
      MercanciaRepository,
      TrabajadorRepository,
    ]),
  ],
  controllers: [
    TipoEquipoController,
    TipoTrabajoController,
    TrabajoEquipoController,
    AlmacenController,
    MercanciaController,
    TrabajadorController,
  ],
  providers: [
    TipoEquipoService,
    TipoTrabajoService,
    TrabajoEquipoService,
    AlmacenService,
    MercanciaService,
    TrabajadorService,
  ],
})
export class TallerModule {}
