import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembershipDto, MembershipDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMembership(createMembershipDto: CreateMembershipDto, boardId: string) {
    const membership = await this.prismaService.membership.create({
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

    return plainToInstance(MembershipDto, membership, { excludeExtraneousValues: true });
  }

  async getMembership(id: string) {
    const membership = await this.prismaService.membership.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(MembershipDto, membership);
  }

  async getMemberships(selectors: {userId?: string, boardId?: string}) {
    const memberships = await this.prismaService.membership.findMany({
      where: {
        ...selectors
      }
    });

    return memberships.map(m => plainToInstance(MembershipDto, m, { excludeExtraneousValues: true }));
  }

  async deleteMembership(id: string) {
    const membership = await this.prismaService.membership.delete({
      where: {
        id,
      },
    });

    return plainToInstance(MembershipDto, membership, { excludeExtraneousValues: true });
  }

}
