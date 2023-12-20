import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { BaseController } from '../../../common/base-controller';
import { Topic } from './entities/topic.entity';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('forum/topics')
export class TopicsController extends BaseController {
  constructor(private readonly topicsService: TopicsService) {
    super();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    try {
      const newTopic = await this.topicsService.create(createTopicDto);
      return this.ok<Topic>(newTopic);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get()
  async findAll() {
    try {
      const topics = await this.topicsService.findAll();
      return this.response(topics);
    } catch (error) {
      this.error('Something went wrong while getting topics', error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
  //   return this.topicsService.update(+id, updateTopicDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.topicsService.remove(+id);
  // }
}
