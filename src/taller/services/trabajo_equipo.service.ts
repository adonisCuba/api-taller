import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrabajoEquipoRepository } from '../repositories/trabajo_equipo.repository';
import { TipoTrabajoService } from './tipo_trabajo.service';
import { TipoEquipoService } from './tipo_equipo.service';
import { TrabajoEquipo } from '../entities/trabajo_equipo.entity';
import { CreataTrabajoEquipoDto } from '../dto/create-trabajo_equipo.dto';

@Injectable()
export class TrabajoEquipoService {
  constructor(
    private trabajoEquipoRepository: TrabajoEquipoRepository,
    private tipoTrabajoService: TipoTrabajoService,
    private tipoEquipoService: TipoEquipoService,
  ) {}

  async findAll(): Promise<TrabajoEquipo[]> {
    return await this.trabajoEquipoRepository.find({
      relations: ['equipo', 'trabajo'],
      where: { visible: true },
    });
  }
  async findOne(id: number): Promise<TrabajoEquipo> {
    const entity = this.trabajoEquipoRepository.findOne(id);
    if (!entity)
      throw new NotFoundException('El trabajo por equipo no existe.');
    return entity;
  }
  async create(
    creataTrabajoEquipoDto: CreataTrabajoEquipoDto,
  ): Promise<TrabajoEquipo> {
    const { trabajo, equipo, precio } = creataTrabajoEquipoDto;
    if (await this.trabajoEquipoExist(trabajo, equipo))
      throw new BadRequestException(
        'La combinación de trabajo - equipo ya se encuentra registrada.',
      );
    const entity = new TrabajoEquipo();
    entity.equipo = await this.tipoEquipoService.findOne(equipo);
    entity.trabajo = await this.tipoTrabajoService.findOne(trabajo);
    entity.precio = precio;
    try {
      await entity.save();
    } catch (error) {
      throw new HttpException('Error salvando la entidad', 500);
    }
    return entity;
  }
  async update(
    id: number,
    updateTrabajoEquipoDto: CreataTrabajoEquipoDto,
  ): Promise<TrabajoEquipo> {
    const { trabajo, equipo, precio } = updateTrabajoEquipoDto;
    if (await this.trabajoEquipoExist(trabajo, equipo))
      throw new BadRequestException(
        'La combinación de trabajo - equipo ya se encuentra registrada.',
      );
    const entity = await this.findOne(id);
    entity.equipo = await this.tipoEquipoService.findOne(equipo);
    entity.trabajo = await this.tipoTrabajoService.findOne(trabajo);
    entity.precio = precio;
    try {
      await entity.save();
    } catch (error) {
      throw new HttpException('Error salvando la entidad', 500);
    }
    return entity;
  }
  async delete(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.visible = false;
    try {
      await entity.save();
    } catch (error) {
      throw new HttpException('Error salvando la entidad', 500);
    }
  }

  async trabajoEquipoExist(trabajo: number, equipo: number): Promise<boolean> {
    const entity = await this.trabajoEquipoRepository.findOne({
      where: {
        trabajo: { id: trabajo },
        equipo: { id: equipo },
        visible: true,
      },
    });
    if (!entity) return false;
    return true;
  }
}
