import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'User email',
    example: '',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User nickname',
    example: 'John Doe',
  })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User password',
    example: '',
  })
  password: string;
}
