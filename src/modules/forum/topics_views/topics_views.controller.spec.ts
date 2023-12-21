import { Test, TestingModule } from '@nestjs/testing';
import { TopicsViewsController } from './topics_views.controller';
import { TopicsViewsService } from './topics_views.service';

describe('TopicsViewsController', () => {
  let controller: TopicsViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsViewsController],
      providers: [TopicsViewsService],
    }).compile();

    controller = module.get<TopicsViewsController>(TopicsViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
