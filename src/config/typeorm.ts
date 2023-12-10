import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'andrew',
  password: '',
  database: 'forum',
  synchronize: true,
  migrationsTableName: '',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
