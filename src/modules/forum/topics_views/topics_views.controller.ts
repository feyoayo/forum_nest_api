import { Controller } from '@nestjs/common';
import { TopicsViewsService } from './topics_views.service';

@Controller('forum/view')
export class TopicsViewsController {
  constructor(private readonly topicsViewsService: TopicsViewsService) {}

  //Temporary disabled

  // @Post(':topicId')
  // recordTopicView(
  //   @Param('topicId') topicId: string,
  //   @Body() createTopicsViewDto: CreateTopicsViewDto,
  // ) {
  //   if (!topicId) throw new NotFoundException('Topic not found');
  //
  //   return this.topicsViewsService.create(createTopicsViewDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.topicsViewsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.topicsViewsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTopicsViewDto: UpdateTopicsViewDto) {
  //   return this.topicsViewsService.update(+id, updateTopicsViewDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.topicsViewsService.remove(+id);
  // }
}
