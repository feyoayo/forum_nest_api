import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

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

  async signIn(user: User) {
    const payload = { sub: user.id, username: user.nickname, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
