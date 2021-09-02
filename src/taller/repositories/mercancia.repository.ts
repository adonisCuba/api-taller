import { EntityRepository, Repository } from 'typeorm';
import { Mercancia } from '../entities/mercancia.entity';

@EntityRepository(Mercancia)
export class MercanciaRepository extends Repository<Mercancia> {
  async findByFilter(
    start: number,
    limit: number,
    almacen: number,
    filter: string,
  ) {
    const query = this.createQueryBuilder('mercancia')
      .select('mercancia')
      .innerJoin('mercancia.almacen', 'almacen');
    if (!!almacen) query.andWhere('almacen.id = :almacen', { almacen });
    if (!!filter)
      query.andWhere('mercancia.nombre ilike :filter', {
        filter: `%${filter}%`,
      });
    query.orderBy('mercancia.fecha_entrada', 'ASC');
    return {
      rows: await query.offset(start).limit(limit).getRawMany(),
      count: await query.getCount(),
    };
  }
}
