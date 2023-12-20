import { Injectable } from '@nestjs/common';
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
    const newTopic = await this.topicRepository.save(createTopicDto);

    //Add validation: title should be unique for current category
    return newTopic;
  }

  findAll() {
    return this.topicRepository.find();
  }

  async findOne(id: number) {
    const topicCandidate = await this.topicRepository.findOne({
      where: { id },
    });

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
