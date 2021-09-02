import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mercancia } from './mercancia.entity';

@Entity()
export class Almacen extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  nombre: string;
  @Column({ default: true })
  visible: boolean;

  @OneToMany(() => Mercancia, (mercancia) => mercancia.almacen)
  mercancias: Mercancia[];
}
