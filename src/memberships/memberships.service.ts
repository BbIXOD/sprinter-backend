import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembershipDto } from './dto';

@Injectable()
export class MembershipsService {
  constructor(private readonly prismaService: PrismaService) {}

  createMembership(createMembershipDto: CreateMembershipDto) {
    return this.prismaService.membership.create({
      data: {
        role: createMembershipDto.role,
        board: {
          connect: {
            id: createMembershipDto.boardId,
          },
        },
        user: {
          connect: {
            id: createMembershipDto.userId,
          }
        }
      },
    });
  }
}
