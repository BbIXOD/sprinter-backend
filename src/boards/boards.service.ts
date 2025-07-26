import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { BoardDto } from './dto/board-dto';
import { Role } from 'generated/prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBoard(createBoardDto: CreateBoardDto, userId: string) {
    const board = await this.prismaService.board.create({
      data: {
        ...createBoardDto
      }
    })
    this.prismaService.membership.create({
      data: {
        user: { connect: { id: userId }},
        board: {
          connect : {
            id: board.id,
          }
        },
        role: Role.ADMIN,
      }
    })

    return plainToInstance(BoardDto, board, { excludeExtraneousValues: true });
  }
}
