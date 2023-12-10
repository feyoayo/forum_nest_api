import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from '../user/dto/login.dto';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('sign-up')
  async create(@Body() createUserDto: User) {
    try {
      const userCandidate = await this.userService.create(createUserDto);
      return {
        message: 'User created',
        data: userCandidate,
      };
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Post('sign-in')
  async signIn(@Body() loginDto: LoginDto) {
    try {
      const { access_token } = await this.userService.login(loginDto);

      return {
        message: 'Login available',
        access_token,
      };
    } catch (e) {
      throw new HttpException(e.message, 401);
    }
  }
}
