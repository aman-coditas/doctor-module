import { Controller, Get, Req, Res, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctors } from './doctors.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}


  @MessagePattern('getDoctors')
  async getDoctors(){
    let doctorsList =  await this.doctorService.getDoctors();
   doctorsList['data'] && doctorsList['data'].length > 0 && doctorsList['data'].map(async item=>{
     const doctorPersonalData = item.profile;
     doctorPersonalData.address = item.practices[0].visit_address;

     item.practices[0].phones.map(item => {
       if (item && item.type === 'landline') {
         doctorPersonalData.phone = item.number;
       }
     })
     doctorPersonalData.firstName = doctorPersonalData.first_name;
     doctorPersonalData.middleName = doctorPersonalData.middle_name;
     doctorPersonalData.lastName = doctorPersonalData.last_name;
     doctorPersonalData.npi = item.npi;
     doctorPersonalData.imageURL = doctorPersonalData.image_url;
    //  Add doctor data dump from better doctor api 
    //  await this.doctorService.saveDoctor(doctorPersonalData);

    })
    return doctorsList;
  }

  @MessagePattern('saveDoctor')
  getPayers(@Body() doctor: Doctors, @Req() req, @Res() res) {
    return this.doctorService.saveDoctor(doctor);
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
}
