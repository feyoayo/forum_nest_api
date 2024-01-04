import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    type: String,
    description: 'User nickname',
    example: 'John Doe',
  })
  nickname: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    example: '',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: '',
  })
  password: string;
}
