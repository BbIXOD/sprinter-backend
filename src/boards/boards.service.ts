import { Injectable } from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'generated/prisma';
import { MembershipsService } from 'src/memberships/memberships.service';

@Injectable()
export class BoardsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly membershipsService: MembershipsService,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: string) {
    const board = await this.prismaService.board.create({
      data: {
        ...createBoardDto,
      },
    });

    console.log(await this.membershipsService.createMembership(
      { roles: [Role.ADMIN, Role.MEMBER], userId },
      board.id,
    ));

    return board;
  }

  findAll() {
    return this.prismaService.board.findMany();
  }

  findOne(id: string) {
    return this.prismaService.board.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.prismaService.board.update({
      where: {
        id,
      },
      data: {
        ...updateBoardDto,
      },
    });
  }


  delete(id: string) {
    return this.prismaService.board.delete({
      where: {
        id,
      },
    });
  }
}
