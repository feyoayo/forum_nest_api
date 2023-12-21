import { HttpException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './entities/topic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async create(createTopicDto: CreateTopicDto) {
    try {
      const { category_id, body, user_id, title } = createTopicDto;
      //Add validation: title should be unique for current category
      return await this.topicRepository.save({
        body,
        title,
        user: { id: user_id },
        category: { id: category_id },
      });
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  findAll() {
    return this.topicRepository.find();
  }

  async findOne(id: number) {
    const topicCandidate = await this.topicRepository.findOne({
      where: { id },
      relations: ['user', 'topic_views'],
    });

    delete topicCandidate.user.password;

    if (!topicCandidate) throw new Error('Topic not found');

    return topicCandidate;
  }

  // update(id: number, updateTopicDto: UpdateTopicDto) {
  //   return `This action updates a #${id} topic`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} topic`;
  // }
}
