import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembershipDto, UpdateMembershipDto } from './dto';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  createMembership(createMembershipDto: CreateMembershipDto, boardId: string) {
    return this.prismaService.membership.create({
      data: {
        roles: createMembershipDto.roles,
        board: {
          connect: {
            id: boardId,
          },
        },
        user: {
          connect: {
            id: createMembershipDto.userId,
          },
        },
      },
    });
  }

  updateMembership(id: string, boardId: string, updateMembershipDto: UpdateMembershipDto) {
    return this.prismaService.membership.update({
      where: {
        id,
        boardId
      },
      data: updateMembershipDto,
    });
  }

  getMembership(id: string, boardId: string) {
    return this.prismaService.membership.findUnique({
      where: {
        id,
        boardId
      },
    });
  }

  getMemberships(selectors: {userId?: string, boardId?: string}) {
    return this.prismaService.membership.findMany({
      where: {
        ...selectors
      }
    });
  }

  deleteMembership(id: string, boardId: string) {
    return this.prismaService.membership.delete({
      where: {
        id,
        boardId,
      },
    });
  }
}
