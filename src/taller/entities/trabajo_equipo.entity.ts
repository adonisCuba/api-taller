import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoEquipo } from './tipo_equipo.entity';
import { TipoTrabajo } from './tipo_trabajo.entity';
@Entity()
export class TrabajoEquipo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => TipoTrabajo, (trabajo) => trabajo.trabajo_equipos)
  trabajo: TipoTrabajo;
  @ManyToOne(() => TipoEquipo, (equipo) => equipo.trabajo_equipos)
  equipo: TipoEquipo;
  @Column({ type: 'numeric' })
  precio: number;
  @Column({ default: true })
  visible: boolean;
}
