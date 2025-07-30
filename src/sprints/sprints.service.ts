import { Injectable } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SprintsService {
  constructor(
    private readonly prismaService: PrismaService,) {}
  create(createSprintDto: CreateSprintDto, boardId: string) {
    return this.prismaService.sprint.create({
      data: {
        board: {
          connect: {
            id: boardId,
          }
        },
        ...createSprintDto,
      }
    });
  }

  findAll(boardId: string) {
    return this.prismaService.sprint.findMany({
      where: { boardId }
    });
  }

  findOne(id: string, boardId: string) {
    return this.prismaService.sprint.findUnique({
      where: {
        id: id,
        boardId
      }
    });
  }

  update(id: string, updateSprintDto: UpdateSprintDto, boardId: string) {

    return this.prismaService.sprint.update({
      where: {
        id: id,
        boardId
      },
      data: updateSprintDto,
    });
  }

  remove(id: string, boardId: string) {
    return this.prismaService.sprint.delete({
      where: {
        id: id,
        boardId
      }
    });
  }
}
