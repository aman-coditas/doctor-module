import { Controller, Get, Req, Res, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctors } from './doctors.entity';
import { MessagePattern } from '@nestjs/microservices';
import { ResponseBody } from 'utils/responseBody';
import { Constants } from 'utils/constants';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) { }

  @MessagePattern('getDoctors')
  async getDoctors() {
    let doctorsList = await this.doctorService.getDoctors();
    return doctorsList;
  }

  @MessagePattern('getDoctorByUID')
  getDoctorByUID(@Body('uid') uid: string): Promise<any> {
    return this.doctorService.getDoctorByUID(uid);
  }

  @MessagePattern('getDoctorByNPI')
  getDoctorByNPI(@Body('npi') npi: string): Promise<any> {
    return this.doctorService.getDoctorByNPI(npi);
  }

  // Todo : Adding route for specilities
  // Bug : UID being called instead of specialities
  @MessagePattern('getDoctorsSpecialities')
  getDoctorsSpecialities(): Promise<any> {
    return this.doctorService.getDoctorsSpecialities();
  }

  @MessagePattern('saveDoctor')
  async saveDoctor(@Body() doctor: Doctors, @Req() req, @Res() res) {
    const data = await this.doctorService.saveDoctor(doctor);
    return new ResponseBody(Constants.STATUSCODE.SUCCESS, Constants.STATUS.SUCCESS, data);
  }

  @MessagePattern('registerDoctor')
  async registerDoctor(@Body() doctor: Doctors, @Req() req, @Res() res) {
    const data = await this.doctorService.registerDoctor(doctor);
    return new ResponseBody(Constants.STATUSCODE.SUCCESS, Constants.STATUS.SUCCESS, data);
  }

  @MessagePattern('updateDoctor')
  async updateDoctorDetails(@Body() doctor: Doctors, @Req() req, @Res() res) {
    const data = await this.doctorService.updateDoctorDetails(doctor);
    return new ResponseBody(Constants.STATUSCODE.SUCCESS, Constants.STATUS.SUCCESS, data);
  }
}
