import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find({
      select: {
        email: true,
        nickname: true,
        id: true,
        role: true,
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
