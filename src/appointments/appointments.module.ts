import { Module, HttpModule, HttpService } from '@nestjs/common';

import { AppointmentsController } from './appointments.controller';
import { BetterDoctorService } from '../better-doctor/better-doctor.service';
import { AppointmentsService } from './appointments.service';
import { Appointments } from './appointments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { Doctors } from '../doctors/doctors.entity';
import { BetterDoctorConfig } from 'src/config/better-doctor-config';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Appointments, Doctors])],
      controllers: [AppointmentsController],
      providers: [AppointmentsService, DoctorsService, BetterDoctorService, BetterDoctorConfig],
      exports: [AppointmentsService],
})
export class AppointmentsModule {}
