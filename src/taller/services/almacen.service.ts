import { CreateAlmacenDto } from './../dto/create-almacen.dto';
import { Almacen } from './../entities/almacen.entity';
import { AlmacenRepository } from './../repositories/almacen.repository';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AlmacenService {
  constructor(private almacenRespository: AlmacenRepository) {}

  async findAll(): Promise<Almacen[]> {
    return await this.almacenRespository.find({ visible: true });
  }
  async findOne(id: number): Promise<Almacen> {
    const entity = await this.almacenRespository.findOne(id);
    if (!entity) throw new NotFoundException('El almacen no existe.');
    return entity;
  }
  async create(createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
    const { nombre } = createAlmacenDto;
    const entity = new Almacen();
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
    updateAlmacenDto: CreateAlmacenDto,
  ): Promise<Almacen> {
    const entity = await this.findOne(id);
    const { nombre } = updateAlmacenDto;
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
