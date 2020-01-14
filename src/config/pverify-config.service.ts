import { Injectable, HttpModuleOptionsFactory, HttpModuleOptions } from '@nestjs/common';

@Injectable()
export class PverifyHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 10000,
      maxRedirects: 5,
      baseURL: '',
    };
  }
}
