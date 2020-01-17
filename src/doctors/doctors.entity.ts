import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('doctors')
export class Doctors extends BaseEntity {
  @Column('varchar', { length: 20 })
  firstName: string;
  @Column('varchar', { length: 20, nullable: true })
  middleName: string;
  @Column('varchar', { length: 20 })
  lastName: string;
  @Column('varchar', { length: 20, nullable: true })
  mobileNumber: string;
  @Column('varchar', { length: 50, nullable: true })
  email: string;
  @Column('varchar', { length: 20, unique: true })
  npi: string;
  @Column('varchar', { length: 200, nullable: true })
  imageURL: string;
  @Column('varchar', { length: 20, nullable: true })
  gender: string;
  @Column('varchar', { length: 200, nullable: true })
  lat: string;
  @Column('varchar', { length: 20, nullable: true })
  lon: string;
  @Column('json', { array: true, nullable: true })
  specialties: Array<{}>;
  @Column('varchar', { length: 20, nullable: true })
  phone: string;
  // @Column('json', { array: true, nullable: true })
  // address: Array<{}>;

}