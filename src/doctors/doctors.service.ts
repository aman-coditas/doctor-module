import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctors } from './doctors.entity';
import { Repository } from 'typeorm';
import { BetterDoctorService } from '../better-doctor/better-doctor.service';
import { Constants } from 'utils/constants';
import { Credentials } from '../credentials/credentials.entity';

@Injectable()
export class DoctorsService {
  private logger = new Logger('DoctorsService');
  constructor(
    @InjectRepository(Doctors) private repository: Repository<Doctors>,
    private betterDoctorService: BetterDoctorService,
    @InjectRepository(Credentials) private loginRepository: Repository<Credentials>,
  ) { }

  async getDoctors(): Promise<any> {
    const doctorsList = this.betterDoctorService.getBetterDoctors();
    // doctorsList['data'] &&
    // doctorsList['data'].length > 0 &&
    // doctorsList['data'].map(async item => {
    // let doctorPersonalData = item.profile;
    // doctorPersonalData.address = item.practices[0].visit_address;
    // item.practices[0].phones.map(item => {
    //   if (item && item.type === 'landline') {
    //     doctorPersonalData.phone = item.number;
    //   }
    // })
    // doctorPersonalData.firstName = doctorPersonalData.first_name;
    // doctorPersonalData.middleName = doctorPersonalData.middle_name;
    // doctorPersonalData.lastName = doctorPersonalData.last_name;
    // doctorPersonalData.npi = item.npi;
    // doctorPersonalData.imageURL = doctorPersonalData.image_url;
    //  Add doctor data dump from better doctor api
    //  await this.doctorService.saveDoctor(doctorPersonalData);
    // });
    return doctorsList;
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
  async saveDoctor(doctor) {
    try {
      const doctorExists = doctor && doctor.npi && await this.repository.findOne({ npi: doctor.npi }).catch(e => { throw e.message });
      if (!doctorExists) {
        await this.repository.save(doctor).catch(e => { throw e.message });
        const message = { status: Constants.STATUS.DOCTOR.SAVED };
        return message;
      }
    } catch (error) {
      this.logger.log(error);
    }
  }
  async registerDoctor(doctor) {
    try {
      const { password, email, ...rest } = doctor
      await this.repository.save({ email, ...rest }).catch(e => { throw e.message });
      const message = { status: Constants.STATUS.DOCTOR.REGISTER };
      return message;

    } catch (error) {
      this.logger.log(error);
    }
  }
  async updateDoctorDetails(doctor) {
    try {
      const { email, password } = doctor;
      const saveLoginData = await this.loginRepository.save({ email, password });
      return { ...saveLoginData };
    } catch (error) {
      this.logger.log(error);
    }
  }
}
