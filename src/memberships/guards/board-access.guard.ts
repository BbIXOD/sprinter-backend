import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { MembershipsService } from "../memberships.service";
import { Reflector } from "@nestjs/core";
import { Role } from "generated/prisma";
import { BoardAccesses } from "../decorators/board-access.decorator";

@Injectable()
export class BoardAccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly membershipService: MembershipsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
    const { userId } = req.user;
    const boardId = req.params.boardId;

    if (!userId || !boardId) return false;

    const role = this.reflector.get<Role>(BoardAccesses, context.getHandler());
    const memberships = await this.membershipService.getMemberships({userId, boardId});

    return memberships.some(m => m.role == role);
  }
}
