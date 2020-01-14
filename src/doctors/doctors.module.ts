import { Module, HttpModule } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { BetterDoctorService } from 'src/better-doctor/better-doctor.service';
import { BetterDoctorConfig } from 'src/config/better-doctor-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctors } from './doctors.entity';

@Module({
  imports: [
    HttpModule, TypeOrmModule.forFeature([Doctors]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, BetterDoctorService, BetterDoctorConfig],
  exports: [DoctorsService],
})
export class DoctorsModule {}
