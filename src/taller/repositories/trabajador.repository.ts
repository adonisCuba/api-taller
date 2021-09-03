import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Trabajador } from '../entities/trabajador.entity';

@EntityRepository(Trabajador)
export class TrabajadorRepository extends Repository<Trabajador> {}
