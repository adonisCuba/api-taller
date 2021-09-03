import { Injectable, NotFoundException } from '@nestjs/common';
import { RecepcionEquipoRepository } from '../repositories/recepcion_equipo.repository';
import { CreateRecepcionDto } from '../dto/create-recepcion.dto';
import { RecepcionEquipo } from '../entities/recepcion_equipo.entity';
import { TipoEquipoService } from './tipo_equipo.service';
import { TipoTrabajoService } from './tipo_trabajo.service';
import { TrabajadorService } from './trabajador.service';
import { TrabajoService } from './trabajo.service';
import { FilterRecepcionDto } from '../dto/filter-recepcion.dto';

@Injectable()
export class RecepcionService {
  constructor(
    private recepcionRepository: RecepcionEquipoRepository,
    private tipoEquipoService: TipoEquipoService,
    private tipoTrabajoService: TipoTrabajoService,
    private trabajadorService: TrabajadorService,
    private trabajoService: TrabajoService,
  ) {}

  async create(
    createRecepcionDto: CreateRecepcionDto,
  ): Promise<RecepcionEquipo> {
    const {
      tipoEquipo,
      tipoTrabajo,
      trabajador,
      fecha,
      nombreCliente,
      ciCliente,
      telefonoCliente,
      identificadorEquipo,
    } = createRecepcionDto;

    const entityTipoEquipo = await this.tipoEquipoService.findOne(tipoEquipo);
    const entityTipoTrabajo = await this.tipoTrabajoService.findOne(
      tipoTrabajo,
    );
    const entityTrabajador = await this.trabajadorService.findOne(trabajador);

    const entity = new RecepcionEquipo();
    entity.fecha = fecha;
    entity.nombreCliente = nombreCliente;
    entity.ciCliente = ciCliente;
    entity.telefonoCliente = telefonoCliente;
    entity.identificadorEquipo = identificadorEquipo;
    entity.tipoEquipo = entityTipoEquipo;
    entity.tipoTrabajo = entityTipoTrabajo;
    entity.trabajador = entityTrabajador;

    await entity.save();

    this.trabajoService.createFromRecepcion(entityTrabajador, entity);
    return entity;
  }

  async findByFilter(filterDto: FilterRecepcionDto) {
    const { fechaIni, fechaFin, nombre, start, limit } = filterDto;
    return await this.recepcionRepository.findByFilter(
      start,
      limit,
      fechaIni,
      fechaFin,
      nombre,
    );
  }

  async findOne(id: string): Promise<RecepcionEquipo> {
    const entity = await this.recepcionRepository.findOne(id);
    if (!entity) throw new NotFoundException('La recepción no existe.');
    return entity;
  }

  async update(
    id: string,
    updateRecepcionDto: CreateRecepcionDto,
  ): Promise<RecepcionEquipo> {
    const {
      tipoEquipo,
      tipoTrabajo,
      trabajador,
      fecha,
      nombreCliente,
      ciCliente,
      telefonoCliente,
      identificadorEquipo,
    } = updateRecepcionDto;
    const entityTipoEquipo = await this.tipoEquipoService.findOne(tipoEquipo);
    const entityTipoTrabajo = await this.tipoTrabajoService.findOne(
      tipoTrabajo,
    );
    const entityTrabajador = await this.trabajadorService.findOne(trabajador);
    const entity = await this.findOne(id);
    entity.fecha = fecha;
    entity.nombreCliente = nombreCliente;
    entity.ciCliente = ciCliente;
    entity.telefonoCliente = telefonoCliente;
    entity.identificadorEquipo = identificadorEquipo;
    entity.tipoEquipo = entityTipoEquipo;
    entity.tipoTrabajo = entityTipoTrabajo;
    entity.trabajador = entityTrabajador;

    this.trabajoService.updateFromRecepcion(entityTrabajador, entity.id);
    return await entity.save();
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    this.trabajoService.cancelFromRecepcion(entity.id);
    await entity.save();
  }
}
