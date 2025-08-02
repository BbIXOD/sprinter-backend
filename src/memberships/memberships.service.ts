import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembershipDto, MembershipDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  createMembership(createMembershipDto: CreateMembershipDto, boardId: string) {
    return this.prismaService.membership.create({
      data: {
        role: createMembershipDto.role,
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

  getMembership(id: string) {
    return this.prismaService.membership.findUnique({
      where: {
        id,
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

  deleteMembership(id: string) {
    return this.prismaService.membership.delete({
      where: {
        id,
      },
    });
  }
}
