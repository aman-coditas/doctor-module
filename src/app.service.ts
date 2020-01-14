import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
