import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrabajadorDto } from '../dto/create-trabajador.dto';
import { Trabajador } from '../entities/trabajador.entity';
import { TrabajadorRepository } from '../repositories/trabajador.repository';

@Injectable()
export class TrabajadorService {
  constructor(private trabajadorRepository: TrabajadorRepository) {}

  async create(createTrabajadorDto: CreateTrabajadorDto): Promise<Trabajador> {
    const { nombre, ci, telefono } = createTrabajadorDto;
    const entity = new Trabajador();
    entity.nombre = nombre;
    entity.ci = ci;
    entity.telefono = telefono;
    return await entity.save();
  }

  async findAll(): Promise<Trabajador[]> {
    return await this.trabajadorRepository.find({ visible: true });
  }

  async findOne(id: number): Promise<Trabajador> {
    const entity = await this.trabajadorRepository.findOne(id);
    if (!entity) throw new NotFoundException('El trabajador no existe.');
    return entity;
  }

  async update(
    id: number,
    updateTrabajadorDto: CreateTrabajadorDto,
  ): Promise<Trabajador> {
    const entity = await this.findOne(id);
    const { nombre, ci, telefono } = updateTrabajadorDto;
    entity.nombre = nombre;
    entity.ci = ci;
    entity.telefono = telefono;
    return await entity.save();
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
