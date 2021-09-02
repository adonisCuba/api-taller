import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrabajoEquipo } from './trabajo_equipo.entity';

@Entity()
export class TipoTrabajo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  nombre: string;
  @Column({ default: true })
  visible: boolean;
  @OneToMany(() => TrabajoEquipo, (trabajo_equipo) => trabajo_equipo.trabajo)
  trabajo_equipos: TrabajoEquipo[];
}
