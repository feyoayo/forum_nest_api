import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 8;

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async isEmailExist(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: User) {
    if (await this.isEmailExist(createUserDto.email)) {
      throw new Error('user exist');
    }

    const userPassword = await hash(createUserDto.password, SALT_ROUNDS);

    const userPayload: User = {
      ...createUserDto,
      password: userPassword,
    };

    return this.userRepository.save(userPayload);
  }

  async login(loginDto: LoginDto) {
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

    const payload = { sub: userCandidate.id, username: userCandidate.nickname };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
