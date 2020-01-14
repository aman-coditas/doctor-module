import { Controller, Body, Req, Res, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { ResponseBody } from '../../utils/responseBody';
import { Constants } from '../../utils/constants';
import { MessagePattern } from '@nestjs/microservices';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appiontmentsService: AppointmentsService,
  ) {}

  @MessagePattern('saveAppointment')
  async saveAppointment(@Body() data) {
    const response = await this.appiontmentsService.saveAppointment(data);
    return new ResponseBody(Constants.STATUSCODE.SUCCESS, Constants.STATUS.SUCCESS, response)
  }
}
