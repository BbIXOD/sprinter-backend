import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createStatusDto: CreateStatusDto, boardId: string) {
    return this.prismaService.status.create({
      data: {
        board: {
          connect: {
            id: boardId,
          },
        },
        ...createStatusDto,
      },
    });
  }

  findAll(boardId: string) {
    return this.prismaService.status.findMany({
      where: { boardId },
    });
  }

  findOne(id: string, boardId: string) {
    return this.prismaService.status.findUnique({
      where: {
        id: id,
        boardId,
      },
    });
  }

  update(id: string, updateStatusDto: UpdateStatusDto, boardId: string) {
    return this.prismaService.status.update({
      where: {
        id: id,
        boardId,
      },
      data: updateStatusDto,
    });
  }

  remove(id: string, boardId: string) {
    return this.prismaService.status.delete({
      where: {
        id: id,
        boardId,
      },
    });
  }
}
