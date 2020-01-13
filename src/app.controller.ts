import { Controller, Logger, Param } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';
import { DoctorsService } from './doctors.service';

@Controller()
export class AppController {
	// create a logger instance
	private logger = new Logger('AppController');

	// inject the doctor service
	constructor(private doctorsService: DoctorsService) {}

	// define message pattern for get all doctors method
	@MessagePattern('getDoctors')
	async getDoctors() {
		this.logger.log('Fetching doctors');
		return this.doctorsService.getDoctors()
	}

	// define message pattern for get doctor by id method
	@MessagePattern('getDoctor')
	async getDoctor(id: number) {
		this.logger.log('Fetching doctor');
		return this.doctorsService.getDoctor(id)
	}
	
	// define message pattern to add new doctor method
	@MessagePattern('addDoctor')
	async addDoctor(doctor: { id: number; name: string; type: string; rating: number; verified: boolean; }) {
		this.logger.log('Adding doctor');
		return this.doctorsService.addDoctor(doctor)
	}
	
	// define message pattern to delete doctor by id
	@MessagePattern('deleteDoctor')
	async deleteDoctor(id: number) {
		this.logger.log('Deleting doctor');
		return this.doctorsService.deleteDoctor(id)
	}
}