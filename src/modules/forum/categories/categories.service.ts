import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListRequestParams } from '../../../types/request.types';
import { isEmpty } from 'lodash';
import REQUEST_DEFAULT_PARAMS from '../../../constants/REQUEST_DEFAULT_PARAMS';

class BaseListUtils {
  private defaultListFields: Record<string, boolean>;

  public setDefaultListFields(fields: string) {
    // this.defaultListFields = fields?.split(',').reduce((acc, field) => {
    //   acc[field] = true;
    //   return acc;
    // }, {});
  }

  public getFieldsToSelect(fields) {
    const select = fields?.split(',').reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    return isEmpty(select) ? this.defaultListFields : select;
  }
}

@Injectable()
export class CategoriesService extends BaseListUtils {
  private readonly defaultCategoryFields = {
    id: true,
    name: true,
    slug: true,
    description: true,
  };
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super();
    this.setDefaultListFields('id,name,slug,description');
  }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll({
    fields,
    limit = REQUEST_DEFAULT_PARAMS.LIMIT,
  }: ListRequestParams) {
    const fieldsToSelect = this.getFieldsToSelect(fields);
    return this.categoryRepository.find({
      select: fieldsToSelect,
      take: limit,
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('Category not found');
    }
    return await this.categoryRepository.delete({ id });
  }

  async toggleArchivation(id: number, isArchived: boolean) {
    return await this.categoryRepository.update(
      { id },
      { is_archived: isArchived },
    );
  }
}
