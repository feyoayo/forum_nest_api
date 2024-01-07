import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { isEmpty } from 'lodash';

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

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      return null;
    }

    const isAuthAvailable: boolean = await compare(password, user.password);

    if (!isAuthAvailable) {
      return null;
    }

    const { password: userPassword, ...result } = user;

    return result;
  }

  // async signIn(signInDto: SignInDto) {
  async signIn(user: User) {
    // if (isEmpty(signInDto)) throw new Error('No data provided');
    //
    // const { email, password } = signInDto;
    //
    // const userCandidate = await this.userRepository.findOneBy({ email });
    //
    // if (!userCandidate) {
    //   throw new NotFoundException();
    // }
    //
    // const isAuthAvailable: boolean = await compare(
    //   password,
    //   userCandidate.password,
    // );
    //
    // if (!isAuthAvailable) {
    //   throw new UnauthorizedException();
    // }

    // const payload = { uid: userCandidate.id, username: userCandidate.nickname };
    const payload = { sub: user.id, username: user.nickname };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
