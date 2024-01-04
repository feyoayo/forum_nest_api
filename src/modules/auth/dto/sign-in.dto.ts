import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ default: 'polinka@gmail.com' })
  email: string;

  @ApiProperty({
    default: '12345',
  })
  password: string;
}
