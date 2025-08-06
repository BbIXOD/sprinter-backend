import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTaskDto: CreateTaskDto, boardId: string) {
    const { userIds, sprintId, statusId, ...rest } = createTaskDto;
    const data = rest as typeof rest & { sprint?: { connect: { id: string } } };

    return this.prismaService.task.create({
      data: {
        board: {
          connect: {
            id: boardId,
          },
        },
        status: {
          connect: {
            id: statusId,
          },
        },
        users: {
          connect: userIds.map((id) => ({ id })),
        },
        ...data,
        ...(sprintId && { sprint: { connect: { id: sprintId } } }),
      },
    });
  }

  findAll(boardId: string) {
    return this.prismaService.task.findMany({
      where: { boardId },
    });
  }

  findOne(id: string, boardId: string) {
    return this.prismaService.task.findUnique({
      where: {
        id: id,
        boardId,
      },
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto, boardId: string) {
    return this.prismaService.task.update({
      where: {
        id: id,
        boardId,
      },
      data: updateTaskDto,
    });
  }

  remove(id: string, boardId: string) {
    return this.prismaService.task.delete({
      where: {
        id: id,
        boardId,
      },
    });
  }
}
