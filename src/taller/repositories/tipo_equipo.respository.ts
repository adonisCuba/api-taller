import { TipoEquipo } from './../entities/tipo_equipo.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TipoEquipo)
export class TipoEquipoRepository extends Repository<TipoEquipo> {}
