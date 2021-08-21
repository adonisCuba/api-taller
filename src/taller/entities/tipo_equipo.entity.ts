import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoEquipo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  nombre: string;
  @Column({ default: true })
  visible: boolean;
}
