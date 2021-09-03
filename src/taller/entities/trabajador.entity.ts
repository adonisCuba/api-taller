import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RecepcionEquipo } from './recepcion_equipo.entity';
import { Trabajo } from './trabajo.entity';
@Entity()
export class Trabajador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  ci: string;
  @Column()
  telefono: string;
  @Column({ default: true })
  visible: boolean;
  @OneToMany(() => RecepcionEquipo, (recepcion) => recepcion.trabajador)
  recepciones: RecepcionEquipo[];
  @OneToMany(() => Trabajo, (trabajo) => trabajo.trabajador)
  trabajos: Trabajo[];
}
