import { Module, HttpModule } from '@nestjs/common';
import { BetterDoctorService } from './better-doctor.service';
import { BetterDoctorConfig } from 'src/config/better-doctor-config';

@Module({
  imports: [HttpModule],
  providers: [BetterDoctorService, BetterDoctorConfig],
  exports: [BetterDoctorService],
})
export class BetterDoctorModule {}
