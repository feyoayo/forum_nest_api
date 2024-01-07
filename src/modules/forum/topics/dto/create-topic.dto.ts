import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title is too short' })
  title: string;

  @IsNotEmpty({ message: 'Category is required' })
  body: string;

  @IsNotEmpty({ message: 'Category is required' })
  category_id: number;

  user_id: number;
}
