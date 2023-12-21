import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicsViewDto } from './create-topics_view.dto';

export class UpdateTopicsViewDto extends PartialType(CreateTopicsViewDto) {}
