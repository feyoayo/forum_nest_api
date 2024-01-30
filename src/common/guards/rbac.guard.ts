import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { UserRole } from '../../modules/user/entities/user.entity';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();
    const token = this.tokenService.extractTokenFromHeader(request);

    if (!request['user']) {
      throw new UnauthorizedException();
    }
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => request['user'].role === role);
  }
}
