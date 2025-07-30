import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { BoardAccessGuard } from 'src/memberships/guards/board-access.guard';
import { JwtAuthGuard } from 'src/common/guards';
import { CreateSprintDto, SprintDto, UpdateSprintDto } from './dto';
import { TransformTo } from 'src/common/decorators';
import { BoardAccesses } from 'src/memberships/decorators/board-access.decorator';
import { Role } from 'generated/prisma';

@TransformTo(SprintDto)
@UseGuards(JwtAuthGuard, BoardAccessGuard)
@Controller('boards/:boardId/sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @BoardAccesses(Role.MEMBER)
  @Post()
  create(@Param('boardId') boardId: string, @Body() createSprintDto: CreateSprintDto) {
    return this.sprintsService.create(createSprintDto, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.sprintsService.findAll(boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Get(':id')
  findOne(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.sprintsService.findOne(id, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Patch(':id')
  update(@Param('id') id: string, @Param('boardId') boardId: string, @Body() updateSprintDto: UpdateSprintDto) {
    return this.sprintsService.update(id, updateSprintDto, boardId);
  }

  @BoardAccesses(Role.MEMBER)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.sprintsService.remove(id, boardId);
  }
}
