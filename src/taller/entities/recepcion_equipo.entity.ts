import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoEquipo } from './tipo_equipo.entity';
import { TipoTrabajo } from './tipo_trabajo.entity';
import { Trabajador } from './trabajador.entity';
@Entity()
export class RecepcionEquipo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fecha: Date;
  @ManyToOne(() => TipoEquipo, (tipoEquipo) => tipoEquipo.recepciones)
  tipoEquipo: TipoEquipo;
  @ManyToOne(() => TipoTrabajo, (tipoTrabajo) => tipoTrabajo.recepciones)
  tipoTrabajo: TipoTrabajo;
  @Column()
  identificadorEquipo: string;
  @Column()
  nombreCliente: string;
  @Column()
  ciCliente: string;
  @Column()
  telefonoCliente: string;
  @ManyToOne(() => Trabajador, (trabajador) => trabajador.recepciones)
  trabajador: Trabajador;
  @Column({ default: true })
  visible: boolean;
}
