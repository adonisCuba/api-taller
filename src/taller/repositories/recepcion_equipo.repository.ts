import { RecepcionEquipo } from '../entities/recepcion_equipo.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RecepcionEquipo)
export class RecepcionEquipoRepository extends Repository<RecepcionEquipo> {
  async findByFilter(
    start: number,
    limit: number,
    fechaIni: Date,
    fechaFin: Date,
    nombre: string,
  ) {
    const query = this.createQueryBuilder('recepcion')
      .innerJoinAndSelect('recepcion.tipoEquipo', 'tipoEquipo')
      .innerJoinAndSelect('recepcion.tipoTrabajo', 'tipoTrabajo')
      .innerJoinAndSelect('recepcion.trabajador', 'trabajador')
      .where('mercancia.visible = true');
    if (fechaIni) query.andWhere('recepcion.fecha >= :fechaIni', { fechaIni });
    if (fechaFin) query.andWhere('recepcion.fecha <= :fechaFin', { fechaFin });
    if (nombre)
      query.andWhere('recepcion.nombreCliente ilike :nombre', {
        nombre: `%${nombre}%`,
      });
    query.orderBy('recepcion.fecha', 'DESC');
    return {
      rows: await query.offset(start).limit(limit).getMany(),
      count: await query.getCount(),
    };
  }
}
