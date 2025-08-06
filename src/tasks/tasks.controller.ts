import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { BoardAccessGuard } from 'src/memberships/guards/board-access.guard';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dto';
import { TransformTo } from 'src/common/decorators';
import { BoardAccesses } from 'src/memberships/decorators/board-access.decorator';
import { Role } from 'generated/prisma';

@TransformTo(TaskDto)
@UseGuards(BoardAccessGuard)
@Controller('boards/:boardId/statuss')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @BoardAccesses(Role.MEMBER)
  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Get(':id')
  findOne(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.tasksService.findOne(id, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Patch(':id')
  update(@Param('id') id: string, @Param('boardId') boardId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.tasksService.remove(id, boardId);
  }
}
