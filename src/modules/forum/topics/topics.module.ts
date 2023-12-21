import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { TopicsViewsModule } from '../topics_views/topics_views.module';
import { ForumModule } from '../forum.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), TopicsViewsModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
