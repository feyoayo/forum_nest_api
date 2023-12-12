import {registerAs} from '@nestjs/config';
import {DataSource, DataSourceOptions} from 'typeorm';

const config = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'andrew_home_coding',
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
