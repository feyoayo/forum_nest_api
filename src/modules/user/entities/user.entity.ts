import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  nickname: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200, default: UserRole.user })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
