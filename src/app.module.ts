import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DoctorsService } from './doctors.service';

@Module({
  controllers: [AppController],
  providers: [DoctorsService],
})
export class AppModule {}
