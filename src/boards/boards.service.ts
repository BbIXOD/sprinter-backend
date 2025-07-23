import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { BoardDto } from './dto/board-dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBoard(boardSource: CreateBoardDto) {
    console.log(boardSource);
    const board = await this.prismaService.board.create({
      data: { ...boardSource },
    });

    return plainToInstance(BoardDto, board, { excludeExtraneousValues: true });
  }
}
