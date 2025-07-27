import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto';
import { JwtAuthGuard } from 'src/common/guards';
import { BoardAccessGuard } from './guards/board-access.guard';
import { BoardAccesses } from './decorators/board-access.decorator';
import { Role } from 'generated/prisma';

@UseGuards(JwtAuthGuard, BoardAccessGuard)
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
  deleteMembership(@Param('id') id: string) {
    return this.membershipsService.deleteMembership(id);
  }
}
