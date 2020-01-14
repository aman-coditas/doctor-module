import { Controller, Get, Req, Res, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctors } from './doctors.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}


  @MessagePattern('getDoctors')
  getDoctors(): Promise<any> {
    return this.doctorService.getDoctors();
  }

  @MessagePattern('saveDoctor')
  getPayers(@Body() doctor: Doctors, @Req() req, @Res() res) {
    return this.doctorService.saveDoctor(doctor);
  }

  @MessagePattern('getDoctorByUID')
  getDoctorByUID(@Param('uid') uid: string): Promise<any> {
    return this.doctorService.getDoctorByUID(uid);
  }

  @MessagePattern('getDoctorByNPI')
  getDoctorByNPI(@Param('npi') npi: string): Promise<any> {
    return this.doctorService.getDoctorByNPI(npi);
  }

  // Todo : Adding route for specilities
  // Bug : UID being called instead of specialities
  @MessagePattern('getDoctorsSpecialities')
  getDoctorsSpecialities(): Promise<any> {
    return this.doctorService.getDoctorsSpecialities();
  }
}
