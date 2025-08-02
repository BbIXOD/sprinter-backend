import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'generated/prisma';
import { MembershipsService } from 'src/memberships/memberships.service';

@Injectable()
export class BoardsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly membershipsService: MembershipsService,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto, userId: string) {
    const board = await this.prismaService.board.create({
      data: {
        ...createBoardDto,
      },
    });

    this.membershipsService.createMembership({ role: Role.ADMIN, userId }, board.id);
    this.membershipsService.createMembership({ role: Role.MEMBER, userId }, board.id);

    return board;
  }

  deleteBoard(id: string) {
    return this.prismaService.board.delete({
      where: {
        id,
      },
    });
  }
}
