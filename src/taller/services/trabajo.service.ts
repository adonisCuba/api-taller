import { Injectable } from '@nestjs/common';
import { TrabajoRepository } from '../repositories/trabajo.repository';
import { Trabajador } from '../entities/trabajador.entity';
import { RecepcionEquipo } from '../entities/recepcion_equipo.entity';
import { Estados, Trabajo } from '../entities/trabajo.entity';

@Injectable()
export class TrabajoService {
  constructor(private trabajoRepository: TrabajoRepository) {}

  createFromRecepcion(trabajador: Trabajador, recepcion: RecepcionEquipo) {
    const entity = new Trabajo();
    entity.recepcion = recepcion;
    entity.trabajador = trabajador;
    entity.estado = Estados.Pendiente;
    entity.save();
  }

  async updateFromRecepcion(trabajador: Trabajador, recepcionId: string) {
    const entity = await this.trabajoRepository.findOne({
      where: { recepcion: recepcionId },
    });
    entity.trabajador = trabajador;
    entity.save();
  }

  async cancelFromRecepcion(recepcionId: string) {
    const entity = await this.trabajoRepository.findOne({
      where: { recepcion: recepcionId },
    });
    entity.estado = Estados.Cancelado;
    entity.causaCancelacion = 'Eliminada la recepción perteneciente al trabajo';
    entity.save();
  }
}
