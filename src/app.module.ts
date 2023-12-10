import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [UsersModule, ForumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
