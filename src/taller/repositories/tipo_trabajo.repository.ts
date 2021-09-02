import { EntityRepository, Repository } from 'typeorm';
import { TipoTrabajo } from '../entities/tipo_trabajo.entity';

@EntityRepository(TipoTrabajo)
export class TipoTrabajoRepository extends Repository<TipoTrabajo> {}
