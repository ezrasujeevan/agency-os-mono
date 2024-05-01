import { DynamicModule, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleInterface } from './google.interface';

@Module({})
export class GoogleModule {
  public static register(options: GoogleInterface): DynamicModule {
    return {
      module: GoogleModule,
      providers: [
        GoogleService,
        {
          provide: 'GOOGLE_SERVICE',
          useValue: options,
        },
      ],
      exports: [GoogleService],
    };
  }

  public static registerAsync(options: GoogleInterface): DynamicModule {
    return {
      module: GoogleModule,
      providers: [
        GoogleService,
        {
          provide: 'GOOGLE_SERVICE',
          useValue: options,
        },
      ],
      exports: [GoogleService],
    };
  }
}
