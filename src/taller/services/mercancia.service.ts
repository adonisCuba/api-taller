import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { FilterMercanciaDto } from '../dto/filter-mercancia.dto';
import { Mercancia } from '../entities/mercancia.entity';
import { MercanciaRepository } from '../repositories/mercancia.repository';
import { AlmacenService } from './almacen.service';
import { CreateMercanciaDto } from '../dto/create-mercancia.dto';

@Injectable()
export class MercanciaService {
  constructor(
    private mercanciaRepository: MercanciaRepository,
    private almacenService: AlmacenService,
  ) {}

  async findByFilter(filterDto: FilterMercanciaDto) {
    const { almacen, nombre, start, limit } = filterDto;
    return await this.mercanciaRepository.findByFilter(
      start,
      limit,
      almacen,
      nombre,
    );
  }
  async create(createMercanciaDto: CreateMercanciaDto): Promise<Mercancia> {
    const {
      codigo,
      nombre,
      almacen,
      precio_entrada,
      precio_salida,
      existencia,
    } = createMercanciaDto;
    const entityCod = await this.mercanciaRepository.findOne({ codigo });
    if (entityCod)
      throw new HttpException(
        `El código ya se encuentra en la mercancía: ${entityCod.nombre}`,
        400,
      );
    const almacenEntity = await this.almacenService.findOne(almacen);
    const entity = new Mercancia();
    entity.codigo = codigo;
    entity.nombre = nombre;
    entity.precio_entrada = precio_entrada;
    entity.precio_salida = precio_salida;
    entity.existencia = existencia;
    entity.almacen = almacenEntity;
    return await entity.save();
  }
  async findOne(id: number): Promise<Mercancia> {
    const entity = await this.mercanciaRepository.findOne(id);
    if (!entity) throw new NotFoundException('La mercancia no existe.');
    return entity;
  }
  async update(
    id: number,
    updateMercanciaDto: CreateMercanciaDto,
  ): Promise<Mercancia> {
    const {
      codigo,
      nombre,
      almacen,
      precio_entrada,
      precio_salida,
      existencia,
    } = updateMercanciaDto;
    const entity = await this.findOne(id);
    const entityCod = await this.mercanciaRepository.findOne({ codigo });
    if (entityCod && entityCod.id !== id)
      throw new HttpException(
        `El código ya se encuentra en la mercancía: ${entityCod.nombre}`,
        400,
      );
    const almacenEntity = await this.almacenService.findOne(almacen);
    entity.codigo = codigo;
    entity.nombre = nombre;
    entity.precio_entrada = precio_entrada;
    entity.precio_salida = precio_salida;
    entity.existencia = existencia;
    entity.almacen = almacenEntity;
    return await entity.save();
  }
  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    await entity.save();
  }
}
