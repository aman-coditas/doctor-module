import { Module, HttpModule } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { BetterDoctorService } from 'src/better-doctor/better-doctor.service';
import { BetterDoctorConfig } from 'src/config/better-doctor-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctors } from './doctors.entity';
import { Credentials } from 'src/credentials/credentials.entity';
import { CredentialsService } from 'src/credentials/credentials.service';

@Module({
  imports: [
    HttpModule, TypeOrmModule.forFeature([Doctors, Credentials]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, BetterDoctorService, BetterDoctorConfig, CredentialsService],
  exports: [DoctorsService],
})
export class DoctorsModule { }
