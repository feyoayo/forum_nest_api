import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RbacGuard } from '../../../common/guards/rbac.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { UserRole } from '../../user/entities/user.entity';

@ApiTags('forum/categories')
@Controller('forum/categories')
export class CategoriesController extends BaseController {
  constructor(private readonly categoriesService: CategoriesService) {
    super();
  }

  @Get()
  async findAll(@Query() queryParams: ListRequestParams) {
    try {
      const categories = await this.categoriesService.findAll(queryParams);
      return this.ok<Category[]>(categories);
    } catch (e) {
      this.error(e, 'Error while fetching categories');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.findOne(+id);
      return this.ok<Category>(category);
    } catch (e) {
      this.error(e, 'Error while fetching category');
    }
  }

  @Roles(UserRole.admin)
  @UseGuards(JwtAuthGuard, RbacGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const categoryCandidate = await this.categoriesService.create(
        createCategoryDto,
      );
      return this.created(categoryCandidate);
    } catch (e) {
      return this.error(e, e.message);
    }
  }

  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RbacGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return this.categoriesService.update(+id, updateCategoryDto);
    } catch (e) {
      this.error(e, 'Error while updating category');
    }
  }

  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RbacGuard)
  @Put(':id/archive')
  async archive(@Param('id') id: string) {
    try {
      await this.categoriesService.toggleArchivation(+id, true);

      return {
        message: 'Success',
      };
    } catch (e) {
      this.error(e, 'Error while archiving category');
    }
  }

  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RbacGuard)
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    try {
      await this.categoriesService.toggleArchivation(+id, false);
      return {
        message: 'Success',
      };
    } catch (e) {
      this.error(e, 'Error while unarchiving category');
    }
  }

  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RbacGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.categoriesService.remove(+id);
      return {
        message: 'Success',
      };
    } catch (e) {
      this.error(e, 'Error while deleting category');
    }
  }
}
