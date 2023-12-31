import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { Topic } from '../../topics/entities/topic.entity';

@Entity({ name: 'topics_views' })
export class TopicsView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ip_address: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.topic_views, { nullable: false })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  viewed_at: Date;
}
