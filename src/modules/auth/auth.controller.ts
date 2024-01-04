import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { LoginDto } from '../user/dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-up')
  async create(@Body() createUserDto: SignUpDto) {
    try {
      const userCandidate = await this.authService.signUp(createUserDto);
      return {
        message: 'User created',
        data: userCandidate,
      };
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @Post('sign-in')
  async signIn(@Body() loginDto: SignInDto) {
    try {
      const { access_token } = await this.authService.signIn(loginDto);

      return {
        message: 'Login available',
        access_token,
      };
    } catch (e) {
      throw new HttpException(e.message, 401);
    }
  }
}
