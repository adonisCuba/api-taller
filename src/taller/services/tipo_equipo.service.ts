import { CreateTipoEquipoDto } from './../dto/create-tipo_equipo.dto';
import { TipoEquipo } from './../entities/tipo_equipo.entity';
import { TipoEquipoRepository } from './../repositories/tipo_equipo.respository';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TipoEquipoService {
  constructor(private tipoEquipoRespository: TipoEquipoRepository) {}

  async findAll(): Promise<TipoEquipo[]> {
    return await this.tipoEquipoRespository.find({ visible: true });
  }
  async findOne(id: number): Promise<TipoEquipo> {
    const entity = await this.tipoEquipoRespository.findOne(id);
    if (!entity) throw new NotFoundException('El tipo de equipo no existe.');
    return entity;
  }
  async create(createTipoEquipoDto: CreateTipoEquipoDto): Promise<TipoEquipo> {
    const { nombre } = createTipoEquipoDto;
    const entity = new TipoEquipo();
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
    updateTipoEquioiDto: CreateTipoEquipoDto,
  ): Promise<TipoEquipo> {
    const entity = await this.findOne(id);
    const { nombre } = updateTipoEquioiDto;
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
