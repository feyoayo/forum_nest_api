import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { TopicsModule } from './topics/topics.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./categories/entities/category.entity";

@Module({
  imports: [CategoriesModule, TopicsModule, TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
})
export class ForumModule {}
