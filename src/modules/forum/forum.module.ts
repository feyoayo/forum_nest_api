import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { TopicsModule } from './topics/topics.module';
import { TopicsViewsModule } from './topics_views/topics_views.module';

@Module({
  imports: [CategoriesModule, TopicsModule, TopicsViewsModule],
})
export class ForumModule {}
