import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../cars/car.entity';

@Entity()
export class Office extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  streetAddress: string;

  @Column({ type: 'varchar' })
  zipCode: string;

  @OneToMany(() => Car, (car: Car) => car.office)
  cars: Car[];
}
