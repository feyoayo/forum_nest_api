import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../../user/entities/user.entity';
import { TopicsView } from '../../topics_views/entities/topics_view.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.topics, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.topics, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => TopicsView, (topicsView) => topicsView.topic, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topic_views' })
  topic_views: TopicsView[];
}
