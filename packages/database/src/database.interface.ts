import {} from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface DbConfig {
  entities: PostgresConnectionOptions['entities'];
}
