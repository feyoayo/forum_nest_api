import { Module } from '@nestjs/common';
import { TopicsViewsService } from './topics_views.service';
import { TopicsViewsController } from './topics_views.controller';
import { TopicsService } from '../topics/topics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsView } from './entities/topics_view.entity';
import { TopicsModule } from '../topics/topics.module';
import { Topic } from '../topics/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicsView, Topic])],
  controllers: [TopicsViewsController],
  providers: [TopicsViewsService],
  exports: [TopicsViewsService],
})
export class TopicsViewsModule {}
