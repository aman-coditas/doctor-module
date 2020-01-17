import { Module, HttpModule, HttpService } from '@nestjs/common';

import { AppointmentsController } from './appointments.controller';
import { BetterDoctorService } from '../better-doctor/better-doctor.service';
import { AppointmentsService } from './appointments.service';
import { Appointments } from './appointments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctors } from '../doctors/doctors.entity';
import { BetterDoctorConfig } from 'src/config/better-doctor-config';
import { Credentials } from 'src/credentials/credentials.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Appointments, Doctors, Credentials])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, DoctorsService, BetterDoctorService, BetterDoctorConfig],
  exports: [AppointmentsService],
})
export class AppointmentsModule { }
