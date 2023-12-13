import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { ListRequestParams } from '../../../types/request.types';

@Controller('forum/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const categoryCandidate =
        this.categoriesService.create(createCategoryDto);
      return {
        message: 'Category created',
        data: categoryCandidate,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @Get()
  findAll(@Query() queryParams: ListRequestParams) {
    try {
      return this.categoriesService.findAll(queryParams);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.categoriesService.findOne(+id);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
