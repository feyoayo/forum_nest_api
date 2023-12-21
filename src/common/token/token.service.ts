import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../modules/auth/auth.constants';
import { Request } from 'express';
import { TokenInterface } from './token.interface';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
  }
  public extractTokenFromHeader(request: Request): string | undefined {
    //@ts-ignore
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  public decodeTokenData(request: Request): TokenInterface | undefined {
    const token = this.extractTokenFromHeader(request);
    return this.jwtService.decode(token);
  }
}
