import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  isString,
} from 'class-validator';




export class MS_GRPC_ENV extends EnvironmentVariables {
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
  //postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
  @IsString()
  @IsOptional()
  DB_URL: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_SCHEMA: string;
}

export class API_GATEWAY_ENV extends EnvironmentVariables {
  
}
