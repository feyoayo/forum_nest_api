import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(3, {
    message: 'Name is too short',
  })
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @MinLength(3, {
    message: 'Name is too short',
  })
  @ApiProperty()
  slug?: string;
}
