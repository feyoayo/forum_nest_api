import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from '../../forum/topics/entities/topic.entity';
import { TopicsView } from '../../forum/topics_views/entities/topics_view.entity';

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

  @OneToMany(() => Topic, (topic) => topic.user)
  @JoinColumn()
  topics: Topic[];

  @OneToMany(() => TopicsView, (topicsView) => topicsView.user, {
    cascade: true,
  })
  @JoinColumn()
  topics_views: TopicsView[];
}
