import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { TipoTrabajoRepository } from '../repositories/tipo_trabajo.repository';
import { TipoTrabajo } from '../entities/tipo_trabajo.entity';
import { CreateTipoTrabajoDto } from '../dto/create-tipo_trabajo.dto';

@Injectable()
export class TipoTrabajoService {
  constructor(private tipoTrabajoRespository: TipoTrabajoRepository) {}

  async findAll(): Promise<TipoTrabajo[]> {
    return await this.tipoTrabajoRespository.find({ visible: true });
  }
  async findOne(id: number): Promise<TipoTrabajo> {
    const entity = await this.tipoTrabajoRespository.findOne(id);
    if (!entity) throw new NotFoundException('El tipo de trabajo no existe.');
    return entity;
  }
  async create(
    createTipoTrabajoDto: CreateTipoTrabajoDto,
  ): Promise<TipoTrabajo> {
    const { nombre } = createTipoTrabajoDto;
    const entity = new TipoTrabajo();
    entity.nombre = nombre;
    try {
      await entity.save();
    } catch (error) {
      throw new HttpException('Error salvando la entidad', 500);
    }
    return entity;
  }
  async update(
    id: number,
    updateTipoTrabajoDto: CreateTipoTrabajoDto,
  ): Promise<TipoTrabajo> {
    const entity = await this.findOne(id);
    const { nombre } = updateTipoTrabajoDto;
    entity.nombre = nombre;
    try {
      await entity.save();
    } catch (error) {
      throw new HttpException('Error salvando la entidad', 500);
    }
    return entity;
  }
  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    try {
      await entity.save();
    } catch (error) {
      throw new HttpException('Error salvando la entidad', 500);
    }
  }
}
