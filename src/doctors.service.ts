
import { Injectable, HttpException } from '@nestjs/common';
import { DOCTORS } from './mocks/doctors.mock';

@Injectable()
export class DoctorsService {
    doctors = DOCTORS;

    getDoctors(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.doctors);
        });
    }

    getDoctor(id: any): Promise<any> {
        return new Promise(resolve => {
            const doctor = this.doctors.find(doctor => doctor.id === Number(id));
            if (!doctor) {
                throw new HttpException('Doctor does not exist', 404);
            }
            resolve(doctor);
        });
    }

    addDoctor(doctor: { id: number; name: string; type: string; rating: number; verified: boolean; }): Promise<any> {
        return new Promise(resolve => {
            this.doctors.push(doctor);
            resolve(this.doctors);
        })
    }

    deleteDoctor(id: any): Promise<any> {
        return new Promise(resolve => {
            let index = this.doctors.findIndex(doctor => doctor.id === Number(id));
            if (index === -1) {
                throw new HttpException('Doctor does not exist!', 404);
            }
            this.doctors.splice(index, 1);
            resolve(this.doctors);
        })
    }
}
