import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Put('change-role/:id')
  async changeRole(@Param('id') id: string, @Body() { role }) {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      if (role !== 'USER' && role !== 'ADMIN') {
        throw new HttpException('Error while changing role', 404);
      }
      user.role = role as UserRole;
      await this.userService.update(+id, user);
      return 'Role changed';
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
