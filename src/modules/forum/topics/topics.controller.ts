import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { BaseController } from '../../../common/base-controller';
import { Topic } from './entities/topic.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { TopicsViewsService } from '../topics_views/topics_views.service';
import { Request } from 'express';
import { TokenService } from '../../../common/token/token.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('forum/topics')
@Controller('forum/topics')
export class TopicsController extends BaseController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly topicsViewsService: TopicsViewsService,
    private readonly topicsService: TopicsService,
  ) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createTopicDto: CreateTopicDto) {
    try {
      const user = req['user'];
      console.log(user, '--user');
      const newTopic = await this.topicsService.create({
        ...createTopicDto,
        // @ts-ignore
        user_id: user.uid,
      });
      return this.created<Topic>(newTopic);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Get()
  async findAll() {
    try {
      const topics = await this.topicsService.findAll();
      return this.ok(topics);
    } catch (error) {
      this.error('Something went wrong while getting topics', error);
    }
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const tokenData = this.tokenService.decodeTokenData(req);

    await this.topicsViewsService.recordView({
      user_id: tokenData?.uid ?? null,
      topic_id: +id,
      ip_address: req.ip,
    });

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
