import { DbConfig } from './database.interface';
export declare class DatabaseModule {
    private static getConnectionOptions;
    private static getConnectionOptionsPostgres;
    static forRoot(dbConfig: DbConfig): {
        module: typeof DatabaseModule;
        imports: import("@nestjs/common").DynamicModule[];
        controllers: never[];
        providers: never[];
        exports: never[];
    };
}
