import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { ListRequestParams } from '../../../types/request.types';
import { BaseController } from '../../../common/base-controller';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('forum/categories')
@Controller('forum/categories')
export class CategoriesController extends BaseController {
  constructor(private readonly categoriesService: CategoriesService) {
    super();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const categoryCandidate =
        this.categoriesService.create(createCategoryDto);
      return this.created(categoryCandidate);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @Get()
  async findAll(@Query() queryParams: ListRequestParams) {
    try {
      const categories = await this.categoriesService.findAll(queryParams);
      return this.ok<Category[]>(categories);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.findOne(+id);
      return this.ok<Category>(category);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id/archive')
  async archive(@Param('id') id: string) {
    try {
      await this.categoriesService.toggleArchivation(+id, true);

      return {
        message: 'Success',
      };
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    try {
      await this.categoriesService.toggleArchivation(+id, false);
      return {
        message: 'Success',
      };
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      await this.categoriesService.remove(+id);
      return {
        message: 'Success',
      };
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
