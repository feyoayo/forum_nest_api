import { Injectable } from '@nestjs/common';
import { CreateTopicsViewDto } from './dto/create-topics_view.dto';
import { TopicsView } from './entities/topics_view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../topics/entities/topic.entity';

@Injectable()
export class TopicsViewsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
    @InjectRepository(TopicsView)
    private readonly topicsViewRepository: Repository<TopicsView>,
  ) {}
  async recordView(createTopicsViewDto: CreateTopicsViewDto) {
    try {
      await this.topicsViewRepository.save({
        ip_address: createTopicsViewDto.ip_address,
        user: {
          id: createTopicsViewDto.user_id,
        },
        topic: {
          id: createTopicsViewDto.topic_id,
        },
      });
      return 'Recorded';
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
