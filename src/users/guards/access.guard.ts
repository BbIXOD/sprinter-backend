import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Accesses } from '../decorators';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accesses = this.reflector.get(Accesses, context.getHandler());

    if (!accesses) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = await this.usersService.findById(req.user.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return accesses.includes(user.access);
  }
}
