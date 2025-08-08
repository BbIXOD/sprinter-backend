import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { BoardAccessGuard } from 'src/memberships/guards/board-access.guard';
import { CreateStatusDto, StatusDto, UpdateStatusDto } from './dto';
import { TransformTo } from 'src/common/decorators';
import { BoardAccesses } from 'src/memberships/decorators/board-access.decorator';
import { Role } from 'generated/prisma';

@TransformTo(StatusDto)
@UseGuards(BoardAccessGuard)
@Controller('boards/:boardId/statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @BoardAccesses(Role.MEMBER)
  @Post()
  create(@Param('boardId') boardId: string, @Body() createStatusDto: CreateStatusDto) {
    return this.statusesService.create(createStatusDto, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.statusesService.findAll(boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Get(':id')
  findOne(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.statusesService.findOne(id, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Patch(':id')
  update(@Param('id') id: string, @Param('boardId') boardId: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusesService.update(id, updateStatusDto, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.statusesService.remove(id, boardId);
  }
}
