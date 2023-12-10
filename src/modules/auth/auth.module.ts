import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
