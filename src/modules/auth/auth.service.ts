import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../user/dto/login.dto';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as R from 'ramda';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

const SALT_ROUNDS = 8;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async isEmailExist(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async signUp(createUserDto: SignUpDto) {
    if (await this.isEmailExist(createUserDto.email)) {
      throw new Error('user exist');
    }

    const userPassword = await hash(createUserDto.password, SALT_ROUNDS);

    const userPayload = {
      ...createUserDto,
      password: userPassword,
    };

    return this.userRepository.save(userPayload);
  }
  async signIn(loginDto: SignInDto) {
    if (R.isEmpty(loginDto)) throw new Error('No data provided');

    const { email, password } = loginDto;

    const userCandidate = await this.userRepository.findOneBy({ email });

    if (!userCandidate) {
      throw new NotFoundException();
    }

    const isAuthAvailable: boolean = await compare(
      password,
      userCandidate.password,
    );

    if (!isAuthAvailable) {
      throw new UnauthorizedException();
    }

    const payload = { uid: userCandidate.id, username: userCandidate.nickname };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
