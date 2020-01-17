import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from './appointments.entity';
import { Repository } from 'typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { AppointmentDto } from './appointments.dto';
import { BetterDoctorService } from '../better-doctor/better-doctor.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private repository: Repository<Appointments>,
    private readonly doctorsService: DoctorsService,
    private betterDoctorService: BetterDoctorService,
  ) {}

  async saveAppointment(appointment: AppointmentDto ): Promise<any> {
    const doctor = await this.betterDoctorService.getDoctorByNPI(appointment.npi);
    const doctorPersonalData = doctor.data.profile;
    doctorPersonalData.address = doctor.data.practices[0].visit_address;

    doctor.data.practices[0].phones.map(item=>{
      if (item && item.type === 'landline'){
        doctorPersonalData.phone = item.number;
      }
    })
    doctorPersonalData.firstName = doctorPersonalData.first_name;
    doctorPersonalData.middleName = doctorPersonalData.middle_name;
    doctorPersonalData.lastName = doctorPersonalData.last_name;
    doctorPersonalData.npi = appointment.npi;
    doctorPersonalData.imageURL = doctorPersonalData.image_url;
    doctorPersonalData.lat = doctor.data.practices[0].lat;
    doctorPersonalData.lon = doctor.data.practices[0].lon;

    doctorPersonalData.appointmentStatus = false;
    doctorPersonalData.otp = appointment.OTP;
    doctorPersonalData.userId = appointment.userId;

    await this.doctorsService.saveDoctor(doctorPersonalData);
    await this.repository.save(doctorPersonalData);
    const message = {status: 'Your appointment is booked Sucessfully' };
    return message;
  }
}
