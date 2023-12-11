import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [CategoriesModule, TopicsModule],
  providers: [CategoriesService],
})
export class ForumModule {}
