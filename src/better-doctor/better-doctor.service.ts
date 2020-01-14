import { Injectable, HttpService } from '@nestjs/common';
import {BetterDoctorConfig} from '../config/better-doctor-config';

@Injectable()
export class BetterDoctorService {
    constructor(
        private readonly httpService: HttpService,
        private betterDoctor: BetterDoctorConfig,
    ) {}

    // get all doctors
    async getBetterDoctors() {
        this.betterDoctor.slug = 'doctors';
        const response = await this.httpService.get(this.betterDoctor.generateURL()).toPromise();
        return response.data;
    }

    // get doctor by uid
    async getDoctorByUID(
        uid: string,
    ): Promise<any> {
        this.betterDoctor.slug = `doctors/${uid}`;
        const response = await this.httpService.get(this.betterDoctor.generateURL()).toPromise();
        return response.data;
    }

    // get doctor by npi
    async getDoctorByNPI(
        npi: string,
    ): Promise<any> {
        this.betterDoctor.slug = `doctors/npi/${npi}`;
        const response = await this.httpService.get(this.betterDoctor.generateURL()).toPromise();
        return response.data;
    }

    // get doctors specialities
    async getDoctorsSpecialities(): Promise<any> {
        this.betterDoctor.slug = 'specialties';
        const response = await this.httpService.get(this.betterDoctor.generateURL()).toPromise();
        return response.data;

    }

}
