import {
  BaseEntity,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Trabajador } from './trabajador.entity';
import { RecepcionEquipo } from './recepcion_equipo.entity';

export enum Estados {
  'Pendiente',
  'Trabajándose',
  'Concluido',
  'Cancelado',
}
export class Trabajo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: Estados.Pendiente })
  estado: Estados;
  @OneToMany(() => Trabajador, (trabajador) => trabajador.trabajos)
  trabajador: Trabajador;
  @UpdateDateColumn({ nullable: true })
  fechaActualizacion: Date;
  @OneToOne(() => RecepcionEquipo)
  @JoinColumn()
  recepcion: RecepcionEquipo;
  @Column({ default: true })
  visible: boolean;
  @Column({ nullable: true })
  causaCancelacion: string;
}
