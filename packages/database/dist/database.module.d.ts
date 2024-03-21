import { DynamicModule } from '@nestjs/common';
import { DatabaseType } from 'typeorm';
export declare class DatabaseModule {
    static forRootAsync(driver: DatabaseType): DynamicModule;
    static forFeature(entities: any): DynamicModule;
}
