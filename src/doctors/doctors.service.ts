import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctors } from './doctors.entity';
import { Repository } from 'typeorm';
import { BetterDoctorService } from '../better-doctor/better-doctor.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctors) private repository: Repository<Doctors>,
    private betterDoctorService: BetterDoctorService,
  ) {}

  async saveDoctor(doctor): Promise<any> {
    const isDoctorExits = await this.repository.findOne({ npi: doctor.npi });
    if (!isDoctorExits) {
      return await this.repository.save(doctor);
    }
  }

  async getDoctors(): Promise<any> {
    return this.betterDoctorService.getBetterDoctors();
  }

  async getDoctorByUID(uid: string): Promise<any> {
    return this.betterDoctorService.getDoctorByUID(uid);
  }

  async getDoctorByNPI(npi: string): Promise<any> {
    return this.betterDoctorService.getDoctorByNPI(npi);
  }

  async getDoctorsSpecialities(): Promise<any> {
    return this.betterDoctorService.getDoctorsSpecialities();
  }
}
