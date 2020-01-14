import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('appointments')
export class Appointments extends BaseEntity {
  @Column('varchar', { length: 500 })
  otp: number;
  @Column('varchar', { length: 20 })
  appointmentStatus: string;
  @Column('varchar', { length: 20 })
  userId: string;
  @Column('varchar', { length: 20 })
  npi: string;

}
