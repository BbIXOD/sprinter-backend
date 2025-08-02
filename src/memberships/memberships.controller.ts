import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto, MembershipDto, UpdateMembershipDto } from './dto';
import { BoardAccessGuard } from './guards/board-access.guard';
import { BoardAccesses } from './decorators/board-access.decorator';
import { Role } from 'generated/prisma';
import { TransformTo } from 'src/common/decorators';

@TransformTo(MembershipDto)
@UseGuards(BoardAccessGuard)
@Controller('boards/:boardId/memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @BoardAccesses(Role.ADMIN)
  @Post()
  createMembership(@Body() createMembershipDto: CreateMembershipDto, @Req() req: any) {
    return this.membershipsService.createMembership(createMembershipDto, req.params.boardId);
  }

  @BoardAccesses(Role.ADMIN)
  @Delete(':id')
  deleteMembership(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.membershipsService.deleteMembership(id, boardId);
  }

  @BoardAccesses(Role.ADMIN)
  @Patch(':id')
  updateMembership(@Param('id') id: string, @Param('boardId') boardId: string, @Body() updateMembershipDto: UpdateMembershipDto) {
    return this.membershipsService.updateMembership(id, boardId, updateMembershipDto);
  }

  @BoardAccesses(Role.ADMIN)
  @Get(':id')
  getMembership(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.membershipsService.getMembership(id, boardId);
  }

  @BoardAccesses(Role.ADMIN)
  @Get()
  getMemberships(@Param('boardId') boardId: string) {
    return this.membershipsService.getMemberships({ boardId });
  }
}
