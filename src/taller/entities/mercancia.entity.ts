import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Almacen } from './almacen.entity';
@Entity()
export class Mercancia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  codigo: string;
  @Index({ fulltext: true })
  @Column()
  nombre: string;
  @Column({ type: 'numeric' })
  precio_entrada: number;
  @Column({ type: 'numeric' })
  precio_salida: number;
  @Column({ type: 'numeric' })
  existencia: number;
  @CreateDateColumn()
  fecha_entrada: Date;
  @UpdateDateColumn({ nullable: true })
  fecha_actualizacion: Date;
  @ManyToOne(() => Almacen, (almacen) => almacen.mercancias)
  almacen: Almacen;
  @Column({ default: true })
  visible: boolean;
}
