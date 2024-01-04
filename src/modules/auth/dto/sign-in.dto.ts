import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ default: 'polinka@gmail.com' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty({
    default: '12345',
  })
  password: string;
}
