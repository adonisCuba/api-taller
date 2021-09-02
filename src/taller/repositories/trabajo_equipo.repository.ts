import { EntityRepository, Repository } from 'typeorm';
import { TrabajoEquipo } from '../entities/trabajo_equipo.entity';

@EntityRepository(TrabajoEquipo)
export class TrabajoEquipoRepository extends Repository<TrabajoEquipo> {}
