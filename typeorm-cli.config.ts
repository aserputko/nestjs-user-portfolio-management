import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { NewMigration1741723216063 } from './src/migrations/1741723216063-NewMigration';
import { Profile } from './src/profile/entities/profile.entity';
import { Project } from './src/project/entities/project.entity';
import { User } from './src/user/entities/user.entity';
dotenv.config();


console.log('process.env.DATABASE_HOST', process.env.DATABASE_HOST)

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || ''),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Profile, Project],
  migrations: [NewMigration1741723216063],
});
